import {
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { Cron } from '@nestjs/schedule';

import { UsersService } from 'src/user/services/users.service';
import { NodemailerService } from 'src/nodemailer/services/nodemailer.service';
import { AuditLogsService } from 'src/audit_logs/services/audit_logs.service';

import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { LoginDto } from '../dto/login.dto';
import { RolesEnum } from 'src/utils/enums/roles/roles.enum';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';

const schedule = require('node-schedule');

import {
  SUBJECT_EMAIL_VERIFICATION_CODE,
  EMAIL_VERIFICATION_CODE,
} from 'src/nodemailer/constants/email_config.constant';
import { Payload } from '../interfaces/payload.interface';
import { Tokens } from '../interfaces/tokens.interface';
import { ActionTypesEnum } from 'src/utils/enums/audit_logs_enums/action_types.enum';
import { QueryTypesEnum } from 'src/utils/enums/audit_logs_enums/query_types.enum';
import { ModuleNameEnum } from 'src/utils/enums/audit_logs_enums/module_names.enum';
import { UserSessionLogService } from 'src/user_session_log/services/user_session_log.service';
import { PrincipalEmailDto } from '../dto/principal_email.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly userSessionLogService: UserSessionLogService,
    private readonly nodemailerService: NodemailerService,
    private readonly auditLogService: AuditLogsService,
  ) {}

  // @Cron('0 19 * * *', {
  //   name: 'CREATE NEW USERS FROM KACTUS',
  //   timeZone: 'America/Bogota',
  // })
  // async handleCron() {
  //   await this.createAllNewUsersFromKactus();
  // }

  // REGISTER FUNTIONS //

  async registerUserCollaborator(
    {
      name,
      last_name,
      user_id_type,
      id_number,
      user_gender,
      birthdate,
      password,
      principal_email,
      personal_email,
      personal_cellphone,
      corporate_email,
      corporate_cellphone,
      collaborator_service_type,
      collaborator_unit,
      collaborator_service,
      collaborator_position,
      collaborator_position_level,
      collaborator_immediate_boss,
      residence_address,
    }: CreateUserDto,
    @Req() requestAuditLog: any,
  ) {
    await this.userService.getUserByIdNumberAndRole(id_number, [
      RolesEnum.COLLABORATOR,
    ]);

    return await this.userService.createUserCollaborator(
      {
        name,
        last_name,
        user_id_type,
        id_number,
        user_gender,
        birthdate,
        password: await bcryptjs.hash(password, 10),
        principal_email,
        personal_email,
        personal_cellphone,
        corporate_email,
        corporate_cellphone,
        collaborator_service_type,
        collaborator_unit,
        collaborator_service,
        collaborator_position,
        collaborator_position_level,
        collaborator_immediate_boss,
        residence_address,
      },
      requestAuditLog,
    );
  }

  async registerUserCollaboratorFromBonnadonaHub(
    userCollaborator: CreateUserDto,
    @Req() requestAuditLog: any,
  ) {
    await this.userService.getUserByIdNumberAndRole(
      userCollaborator.id_number,
      [RolesEnum.COLLABORATOR],
    );

    return await this.userService.createUserCollaboratorFromBonnadonaHub(
      userCollaborator,
      requestAuditLog,
    );
  }

  async createAllNewUsersFromKactus() {
    try {
      const collaborators =
        await this.userService.getAllCollaboratorFromKactus();

      const createdUsers = [];

      for (const collaborator of collaborators) {
        const userFound = await this.userRepository.findOne({
          where: {
            id_number: collaborator.empDoc,
          },
        });

        if (!userFound) {
          const userCollaborator = new CreateUserDto();

          userCollaborator.user_id_type = collaborator?.idTypeIdNumber;
          userCollaborator.id_number = collaborator?.empDoc;
          userCollaborator.user_gender = collaborator?.genderTypeIdNumber;

          userCollaborator.name = collaborator?.empName.trim();
          userCollaborator.last_name = collaborator?.empLastName.trim();
          userCollaborator.principal_email = collaborator?.empEmail.trim();
          userCollaborator.personal_email = collaborator?.empEmail.trim();
          userCollaborator.personal_cellphone = collaborator?.empPhone
            ? collaborator?.empPhone.trim()
            : null;
          userCollaborator.birthdate = collaborator?.empBirthDate.trim();
          userCollaborator.residence_address = collaborator?.empAddress.trim();
          userCollaborator.collaborator_immediate_boss =
            collaborator?.empImmediateBoss.trim();
          userCollaborator.collaborator_position =
            collaborator?.empPosition.trim();

          const serviceOfCompany = collaborator?.empCostCenter
            .replace(/\d+/g, '')
            .trim();
          userCollaborator.collaborator_service = serviceOfCompany;

          const password = collaborator.empDoc;
          userCollaborator.password = await bcryptjs.hash(password, 10);

          const createdUser =
            await this.userService.createAllNewUsersCollaboratorsFromKactus(
              userCollaborator,
            );

          createdUsers.push(createdUser);
        }
      }

      return createdUsers;
    } catch (error) {
      throw new HttpException(
        'Hubo un error al crear los usuarios.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  // LOGIN FUNTIONS //

  async loginCollaboratorUser({ principal_email, password }: LoginDto) {
    const collaboratorUserRoleFound = await this.roleRepository.find({
      where: { name: In([RolesEnum.COLLABORATOR]) },
    });

    if (!collaboratorUserRoleFound) {
      throw new UnauthorizedException(`¡Role de usuario no encontrado!`);
    }

    const bannedUserFound = await this.userRepository.findOne({
      where: { principal_email: principal_email, is_active: false },
    });

    if (bannedUserFound) {
      throw new UnauthorizedException(
        `¡Usuario bloqueado, por favor comunicarse con el equipo de soportes TICS!`,
      );
    }

    const collaboratorFound =
      await this.userService.getUserFoundByEmailWithPassword(principal_email);

    if (!collaboratorFound) {
      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const verifiedCollaboratorRole = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where('user.principal_email = :principal_email', { principal_email })
      .andWhere('role.id IN (:...roleIds)', {
        roleIds: collaboratorUserRoleFound.map((role) => role.id),
      })
      .andWhere('user.is_active = :isActive', { isActive: true })
      .getOne();

    if (!verifiedCollaboratorRole) {
      throw new UnauthorizedException(`¡Usuario no autorizado!`);
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      collaboratorFound.password,
    );

    if (!isCorrectPassword) {
      await this.userSessionLogService.updateUserSessionLog(
        collaboratorFound.id,
        false,
      );

      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.userRepository.update(
      {
        id: collaboratorFound.id,
      },
      { verification_code: verificationCode },
    );

    const userCollaboratorWithCode = await this.userRepository.findOne({
      where: {
        id: collaboratorFound.id,
      },
    });

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [collaboratorFound.principal_email];
    emailDetailsToSend.userNameToEmail = collaboratorFound.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.emailTemplate = EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.verificationCode =
      userCollaboratorWithCode.verification_code;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
      await this.userRepository.update(
        { id: collaboratorFound.id },
        { verification_code: null },
      );
    });

    return { principal_email };
  }

  async loginAdminAndAuditorUser({ principal_email, password }: LoginDto) {
    const adminOrAuditorUserRoleFound = await this.roleRepository.find({
      where: {
        name: In([RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.AUDITOR]),
      },
    });

    if (!adminOrAuditorUserRoleFound) {
      throw new UnauthorizedException(`¡Role de usuario no encontrado!`);
    }

    const bannedAdminOrAuditorFound = await this.userRepository.findOne({
      where: { principal_email: principal_email, is_active: false },
    });

    if (bannedAdminOrAuditorFound) {
      throw new UnauthorizedException(
        `¡Usuario bloqueado, por favor comunicarse con el equipo de soportes TICS!`,
      );
    }

    const adminOrAuditorFound =
      await this.userService.getUserFoundByEmailWithPassword(principal_email);

    if (!adminOrAuditorFound) {
      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const verifiedAdminOrAuditorRole = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where('user.principal_email = :principal_email', { principal_email })
      .andWhere('role.id IN (:...roleIds)', {
        roleIds: adminOrAuditorUserRoleFound.map((role) => role.id),
      })
      .andWhere('user.is_active = :isActive', { isActive: true })
      .getOne();

    if (!verifiedAdminOrAuditorRole) {
      throw new UnauthorizedException(`¡Usuario no autorizado!`);
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      adminOrAuditorFound.password,
    );

    if (!isCorrectPassword) {
      await this.userSessionLogService.updateUserSessionLog(
        adminOrAuditorFound.id,
        false,
      );

      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.userRepository.update(
      {
        id: adminOrAuditorFound.id,
      },
      { verification_code: verificationCode },
    );

    const userAdminOrAuditorWithCode = await this.userRepository.findOne({
      where: {
        id: adminOrAuditorFound.id,
      },
    });

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [adminOrAuditorFound.principal_email];
    emailDetailsToSend.userNameToEmail = adminOrAuditorFound.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.emailTemplate = EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.verificationCode =
      userAdminOrAuditorWithCode.verification_code;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
      await this.userRepository.update(
        { id: adminOrAuditorFound.id },
        { verification_code: null },
      );
    });

    return { principal_email };
  }

  private getExpirationInSeconds(expiresIn: string): number {
    const expiresInInSeconds = parseInt(expiresIn, 10) * 60;

    return expiresInInSeconds;
  }

  private async generateTokens(user): Promise<Tokens> {
    const jwtUserPayload = {
      sub: user.sub,
      name: user.name,
      user_id_type: user.user_id_type,
      id_number: user.id_number,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken, accessTokenExpiresIn] = await Promise.all(
      [
        await this.jwtService.signAsync(jwtUserPayload, {
          secret: process.env.JWT_CONSTANTS_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        }),

        await this.jwtService.signAsync(jwtUserPayload, {
          secret: process.env.JWT_CONSTANTS_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }),

        await this.getExpirationInSeconds(process.env.ACCESS_TOKEN_EXPIRES_IN),
      ],
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      access_token_expires_in: accessTokenExpiresIn,
    };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const user = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_CONSTANTS_SECRET,
      });

      const payload: Payload = {
        sub: user.sub,
        name: user.name,
        user_id_type: user.user_id_type,
        id_number: user.id_number,
        email: user.email,
        role: user.role,
      };

      const { access_token, refresh_token, access_token_expires_in } =
        await this.generateTokens(payload);

      return {
        access_token,
        refresh_token,
        access_token_expires_in,
        status: HttpStatus.CREATED,
        message: '¡Refresh Token Successfully!',
      };
    } catch (error) {
      throw new UnauthorizedException(`¡Refresh Token Failed!`);
    }
  }

  async verifyCodeAndLoginCollaboratorUser(
    principal_email: string,
    verification_code: number,
  ) {
    const collaboratorUserRoleFound = await this.roleRepository.find({
      where: { name: In([RolesEnum.COLLABORATOR]) },
    });

    if (!collaboratorUserRoleFound) {
      throw new UnauthorizedException(`¡Role de usuario no encontrado!`);
    }

    const verifiedCollaboratorRole = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where('user.principal_email = :principal_email', {
        principal_email: principal_email,
      })
      .andWhere('role.id IN (:...roleIds)', {
        roleIds: collaboratorUserRoleFound.map((role) => role.id),
      })
      .andWhere('user.is_active = :isActive', { isActive: true })
      .getOne();

    if (!verifiedCollaboratorRole) {
      throw new UnauthorizedException(`¡Usuario no autorizado!`);
    }

    const collaboratorFound =
      await this.userService.getUserActiveByEmailAndCode(
        principal_email,
        verification_code,
      );

    if (!collaboratorFound) {
      throw new UnauthorizedException(`¡Código de verificación incorrecto!`);
    }

    await this.userRepository.update(
      {
        id: collaboratorFound.id,
      },
      { verification_code: null },
    );

    await this.userSessionLogService.updateUserSessionLog(
      collaboratorFound.id,
      true,
    );

    const payload = {
      sub: collaboratorFound.id,
      name: `${collaboratorFound.name} ${collaboratorFound.last_name}`,
      user_id_type: collaboratorFound.user_id_type,
      id_number: collaboratorFound.id_number,
      email: collaboratorFound.principal_email,
      role: collaboratorFound.role.map((role) => ({
        id: role.id,
        name: role.name,
      })),
      permission: collaboratorFound.permission.map((permission) => ({
        id: permission.id,
        name: permission.name,
        applications: permission.applications.map((app) => ({
          id: app.id,
          name: app.name,
          image_path: app.image_path,
          entry_link: app.entry_link,
        })),
        application_modules: permission.application_modules.map((module) => ({
          id: module.id,
          name: module.name,
        })),
        module_actions: permission.module_actions.map((action) => ({
          id: action.id,
          name: action.name,
        })),
      })),
    };

    const { access_token, refresh_token, access_token_expires_in } =
      await this.generateTokens(payload);

    return {
      access_token,
      refresh_token,
      access_token_expires_in,
      name: payload.name,
      id_number: payload.id_number,
      principal_email: payload.email,
      role: payload.role,
      permission: payload.permission,
    };
  }

  async verifyCodeAndLoginAdminAndAuditorUser(
    principal_email: string,
    verification_code: number,
    @Req() requestAuditLog: any,
  ) {
    const adminOrAuditorUserRoleFound = await this.roleRepository.find({
      where: {
        name: In([RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.AUDITOR]),
      },
    });

    if (!adminOrAuditorUserRoleFound) {
      throw new UnauthorizedException(`¡Role de usuario no encontrado!`);
    }

    const verifiedAdminOrAuditorRole = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where('user.principal_email = :principal_email', {
        principal_email: principal_email,
      })
      .andWhere('role.id IN (:...roleIds)', {
        roleIds: adminOrAuditorUserRoleFound.map((role) => role.id),
      })
      .andWhere('user.is_active = :isActive', { isActive: true })
      .getOne();

    if (!verifiedAdminOrAuditorRole) {
      throw new UnauthorizedException(`¡Usuario no autorizado!`);
    }

    const adminOrAuditorFound =
      await this.userService.getUserActiveByEmailAndCode(
        principal_email,
        verification_code,
      );

    if (!adminOrAuditorFound) {
      throw new UnauthorizedException(`¡Código de verificación incorrecto!`);
    }

    await this.userRepository.update(
      {
        id: adminOrAuditorFound.id,
      },
      { verification_code: null },
    );

    await this.userSessionLogService.updateUserSessionLog(
      adminOrAuditorFound.id,
      true,
    );

    const payload: Payload = {
      sub: adminOrAuditorFound.id,
      name: `${adminOrAuditorFound.name} ${adminOrAuditorFound.last_name}`,
      user_id_type: adminOrAuditorFound.user_id_type,
      id_number: adminOrAuditorFound.id_number,
      email: adminOrAuditorFound.principal_email,
      role: adminOrAuditorFound.role.map((role) => ({
        id: role.id,
        name: role.name,
      })),
      permission: adminOrAuditorFound.permission.map((permission) => ({
        id: permission.id,
        name: permission.name,
        applications: permission.applications.map((app) => ({
          id: app.id,
          name: app.name,
          image_path: app.image_path,
          entry_link: app.entry_link,
        })),
        application_modules: permission.application_modules.map((module) => ({
          id: module.id,
          name: module.name,
        })),
        module_actions: permission.module_actions.map((action) => ({
          id: action.id,
          name: action.name,
        })),
      })),
    };

    const { access_token, refresh_token, access_token_expires_in } =
      await this.generateTokens(payload);

    const roleNames = adminOrAuditorFound?.role.map((role) => role.name) || [
      'NO REGISTRA',
    ];

    const auditLogData = {
      user_name:
        `${adminOrAuditorFound.name} ${adminOrAuditorFound.last_name}` ||
        'NO REGISTRA',
      user_id_number: adminOrAuditorFound.id_number.toString(),
      user_email: adminOrAuditorFound.principal_email || 'NO REGISTRA',
      user_role: roleNames,
      is_mobile: requestAuditLog.headers['sec-ch-ua-mobile'] || 'NO REGISTRA',
      browser_version: requestAuditLog.headers['sec-ch-ua'] || 'NO REGISTRA',
      operating_system:
        requestAuditLog.headers['sec-ch-ua-platform'] || 'NO REGISTRA',
      ip_address: requestAuditLog.ip || 'NO REGISTRA',
      action_type: ActionTypesEnum.LOGIN,
      query_type: QueryTypesEnum.POST,
      module_name: ModuleNameEnum.USER_MODULE,
      module_record_id: 'NO REGISTRA',
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return {
      access_token,
      refresh_token,
      access_token_expires_in,
      id_number: payload.id_number,
      principal_email: payload.email,
      role: payload.role,
      permission: payload.permission,
    };
  }

  async resendVerificationUserCode({ principal_email }: PrincipalEmailDto) {
    const collaboratorFound =
      await this.userService.getUserActiveByEmail(principal_email);

    if (!collaboratorFound) {
      throw new UnauthorizedException(`¡Usuario no encontrado!`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.userRepository.update(
      {
        id: collaboratorFound.id,
      },
      { verification_code: verificationCode },
    );

    const userCollaboratorWithCode = await this.userRepository.findOne({
      where: {
        id: collaboratorFound.id,
      },
    });

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [collaboratorFound.principal_email];
    emailDetailsToSend.userNameToEmail = collaboratorFound.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.emailTemplate = EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.verificationCode =
      userCollaboratorWithCode.verification_code;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
      await this.userRepository.update(
        { id: collaboratorFound.id },
        { verification_code: null },
      );
    });

    return { email: userCollaboratorWithCode.principal_email };
  }
}
