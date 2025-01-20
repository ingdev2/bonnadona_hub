import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Req,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserProfile } from 'src/user_profile/entities/user_profile.entity';
import { IdType } from 'src/id_types/entities/id_type.entity';
import { GenderType } from 'src/gender_types/entities/gender_type.entity';
import { BloodGroup } from 'src/blood_groups/entities/blood_group.entity';
import { ServiceType } from 'src/service_types/entities/service_type.entity';
import { PositionLevel } from 'src/position_levels/entities/position_level.entity';
import { Role } from 'src/role/entities/role.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { PermissionsService } from 'src/permissions/services/permissions.service';
import { UserSessionLog } from 'src/user_session_log/entities/user_session_log.entity';
import { PasswordPolicy } from 'src/password_policy/entities/password_policy.entity';
import { PasswordPolicyService } from 'src/password_policy/services/password_policy.service';
import { PasswordHistoryService } from 'src/password_history/services/password_history.service';
import { NodemailerService } from 'src/nodemailer/services/nodemailer.service';
import { validateCorporateEmail } from '../helpers/validate_corporate_email';
import { AuditLogsService } from 'src/audit_logs/services/audit_logs.service';

import { Cron } from '@nestjs/schedule';
import { nanoid } from 'nanoid';

import { IdTypeEnum } from 'src/utils/enums/user/id_types.enum';
import { IdTypeAbbrev } from 'src/utils/enums/user/id_types_abbrev.enum';
import { GenderTypeEnums } from 'src/utils/enums/user/gender_types.enum';
import { GenderTypeAbbrev } from 'src/utils/enums/user/gender_types_abbrev.enum';
import { RolesEnum } from 'src/utils/enums/roles/roles.enum';
import { ActionTypesEnum } from 'src/utils/enums/audit_logs_enums/action_types.enum';
import { QueryTypesEnum } from 'src/utils/enums/audit_logs_enums/query_types.enum';
import { ModuleNameEnum } from 'src/utils/enums/audit_logs_enums/module_names.enum';

import { ValidateCollaboratorDto } from '../dto/validate_collaborator.dto';
import { SearchCollaboratorDto } from '../dto/search_collaborator.dto';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';
import { UpdateUserProfileDto } from '../dto/update_user_profile.dto';
import { UpdatePasswordUserDto } from '../dto/update_password_user.dto';
import { CreateDigitalSignatureDto } from 'src/user_profile/dto/create-digital-signature.dto';
import { ForgotPasswordUserDto } from '../dto/forgot_password_user.dto';
import { ResetPasswordUserDto } from '../dto/reset_password_user.dto';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';

import axios from 'axios';
import * as bcryptjs from 'bcryptjs';

import {
  ACCOUNT_CREATED,
  PASSWORD_RESET,
  PASSWORD_UPDATED,
  RESET_PASSWORD_TEMPLATE,
  SUBJECT_ACCOUNT_CREATED,
  UPDATED_PASSWORD_TEMPLATE,
} from 'src/nodemailer/constants/email_config.constant';
import { SUPPORT_CONTACT_EMAIL } from 'src/utils/constants/constants';
import { maskEmailUser } from '../helpers/mask_email';

const schedule = require('node-schedule');
const sharp = require('sharp');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,

    @InjectRepository(UserSessionLog)
    private userSessionLogRepository: Repository<UserSessionLog>,

    @InjectRepository(IdType)
    private idTypeRepository: Repository<IdType>,

    @InjectRepository(GenderType)
    private genderRepository: Repository<GenderType>,

    @InjectRepository(BloodGroup)
    private bloodGroupRepository: Repository<BloodGroup>,

    @InjectRepository(Role) private roleRepository: Repository<Role>,

    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,

    @InjectRepository(ServiceType)
    private serviceTypeRepository: Repository<ServiceType>,

    @InjectRepository(PositionLevel)
    private positionLevelRepository: Repository<PositionLevel>,

    @Inject(forwardRef(() => PermissionsService))
    private readonly permissionsService: PermissionsService,

    private readonly passwordPolicyService: PasswordPolicyService,

    private readonly passwordHistoryService: PasswordHistoryService,

    private readonly nodemailerService: NodemailerService,

    private readonly auditLogService: AuditLogsService,
  ) {}

  // @Cron('0 20 * * *', {
  //   name: 'UPDATE ALL USERS DATA FROM KACTUS',
  //   timeZone: 'America/Bogota',
  // })
  // async handleCron() {
  //   await this.updateAllUsersDataFromKactus();
  // }

  // @Cron('0 21 * * *', {
  //   name: 'BAN ALL USERS FOR WITHDRAWAL',
  //   timeZone: 'America/Bogota',
  // })
  // async handleCron() {
  //   await this.banAllUsersForWithdrawalFromKactus();
  // }

  // @Cron('0 22 * * *', {
  //   name: 'BAN ALL USERS FOR INACTIVITY',
  //   timeZone: 'America/Bogota',
  // })
  // async handleCron() {
  //   await this.banAllUsersForInactivity();
  // }

  // CREATE FUNTIONS //

  async getAllActiveCollaboratorsFromKactus() {
    try {
      const AUTH_VALUE = process.env.X_AUTH_VALUE;

      const response = await axios.get(
        `http://190.131.222.108:8088/api/v1/hub/get/employees-database/status/A`,
        {
          headers: {
            'X-Authorization': AUTH_VALUE,
          },
        },
      );

      const allData = response?.data;

      if (!allData?.data || allData.data.length === 0) {
        throw new HttpException(
          'No se encontraron datos de colaboradores.',
          HttpStatus.NOT_FOUND,
        );
      }

      const idTypeAbbreviations: Record<IdTypeAbbrev, IdTypeEnum> = {
        [IdTypeAbbrev.CÉDULA_DE_CIUDADANÍA]: IdTypeEnum.CITIZENSHIP_CARD,
        [IdTypeAbbrev.CÉDULA_DE_EXTRANJERÍA]: IdTypeEnum.FOREIGNER_ID,
        [IdTypeAbbrev.TARJETA_DE_IDENTIDAD]: IdTypeEnum.IDENTITY_CARD,
        [IdTypeAbbrev.REGISTRO_CIVIL]: IdTypeEnum.CIVIL_REGISTRATION,
        [IdTypeAbbrev.PASAPORTE]: IdTypeEnum.PASSPORT,
        [IdTypeAbbrev.PERMISO_ESPECIAL]: IdTypeEnum.SPECIAL_PERMIT,
        [IdTypeAbbrev.PERMISO_PROTECCIÓN_TEMPORAL]:
          IdTypeEnum.TEMPORARY_PROTECTION_PERMIT,
        [IdTypeAbbrev.CARNET_DIPLOMÁTICO]: IdTypeEnum.DIPLOMATIC_CARD,
        [IdTypeAbbrev.NIT]: IdTypeEnum.NIT,
        [IdTypeAbbrev.SALVOCONDUCTO]: IdTypeEnum.PASS,
        [IdTypeAbbrev.NO_APLICA]: IdTypeEnum.NOT_APPLICABLE,
      };

      const genderTypeAbbreviations: Record<GenderTypeAbbrev, GenderTypeEnums> =
        {
          [GenderTypeAbbrev.MASCULINO]: GenderTypeEnums.MALE,
          [GenderTypeAbbrev.FEMENINO]: GenderTypeEnums.FEMALE,
        };

      const transformedData = await Promise.all(
        allData.data.map(async (collaborator: any) => {
          const idTypeEnum = idTypeAbbreviations[collaborator.empDocType];
          const genderEnum = genderTypeAbbreviations[collaborator.empGender];

          if (!idTypeEnum) {
            throw new HttpException(
              `Tipo de identificación no reconocido para el usuario con documento: ${collaborator.empDoc}.`,
              HttpStatus.BAD_REQUEST,
            );
          }

          if (!genderEnum) {
            throw new HttpException(
              `Género no reconocido para el usuario con documento: ${collaborator.empDoc}.`,
              HttpStatus.BAD_REQUEST,
            );
          }

          const idTypeOfUserIdNumber = await this.idTypeRepository.findOne({
            where: { name: idTypeEnum },
          });

          if (!idTypeOfUserIdNumber) {
            throw new HttpException(
              `Tipo de identificación no encontrado para el usuario con documento: ${collaborator.empDoc}.`,
              HttpStatus.CONFLICT,
            );
          }

          const genderTypeOfUserIdNumber = await this.genderRepository.findOne({
            where: { name: genderEnum },
          });

          if (!genderTypeOfUserIdNumber) {
            throw new HttpException(
              `Género no encontrado para el usuario con documento: ${collaborator.empDoc}.`,
              HttpStatus.CONFLICT,
            );
          }

          return {
            ...collaborator,
            idTypeIdNumber: idTypeOfUserIdNumber.id,
            genderTypeIdNumber: genderTypeOfUserIdNumber.id,
          };
        }),
      );

      return transformedData;
    } catch (error) {
      throw new HttpException(
        'Hubo un error al consultar en la base de datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async validateThatTheCollaboratorExist({
    idType,
    idNumber,
  }: ValidateCollaboratorDto) {
    try {
      const AUTH_VALUE = process.env.X_AUTH_VALUE;

      const response = await axios.get(
        `http://190.131.222.108:8088/api/v1/hub/get/employees-information/${idNumber}/${idType}`,
        {
          headers: {
            'X-Authorization': AUTH_VALUE,
          },
        },
      );

      const allData = response?.data;

      if (!allData) {
        throw new HttpException(
          `El colaborador con número de identificación ${idNumber} no esta registrado en la base de datos de la clínica.`,
          HttpStatus.NOT_FOUND,
        );
      }

      // TRANSFORMAR DATOS DE TIPOS DE IDENTIFICACIÓN

      const idTypeAbbrev = allData?.data[0]?.empDocType;

      const idTypeAbbreviations: Record<IdTypeAbbrev, IdTypeEnum> = {
        [IdTypeAbbrev.CÉDULA_DE_CIUDADANÍA]: IdTypeEnum.CITIZENSHIP_CARD,
        [IdTypeAbbrev.CÉDULA_DE_EXTRANJERÍA]: IdTypeEnum.FOREIGNER_ID,
        [IdTypeAbbrev.TARJETA_DE_IDENTIDAD]: IdTypeEnum.IDENTITY_CARD,
        [IdTypeAbbrev.REGISTRO_CIVIL]: IdTypeEnum.CIVIL_REGISTRATION,
        [IdTypeAbbrev.PASAPORTE]: IdTypeEnum.PASSPORT,
        [IdTypeAbbrev.PERMISO_ESPECIAL]: IdTypeEnum.SPECIAL_PERMIT,
        [IdTypeAbbrev.PERMISO_PROTECCIÓN_TEMPORAL]:
          IdTypeEnum.TEMPORARY_PROTECTION_PERMIT,
        [IdTypeAbbrev.CARNET_DIPLOMÁTICO]: IdTypeEnum.DIPLOMATIC_CARD,
        [IdTypeAbbrev.NIT]: IdTypeEnum.NIT,
        [IdTypeAbbrev.SALVOCONDUCTO]: IdTypeEnum.PASS,
        [IdTypeAbbrev.NO_APLICA]: IdTypeEnum.NOT_APPLICABLE,
      };

      const idTypeNumberForInsert = idTypeAbbreviations[idTypeAbbrev];

      const idTypeOfUserIdNumber = await this.idTypeRepository.findOne({
        where: {
          name: idTypeNumberForInsert,
        },
      });

      if (!idTypeOfUserIdNumber) {
        throw new HttpException(
          `Tipo de identificación no encontrado en base de datos.`,
          HttpStatus.CONFLICT,
        );
      }

      const idTypeId = idTypeOfUserIdNumber.id;

      // TRANSFORMAR DATOS DE GÉNERO

      const genderTypeAbbrev = allData?.data[0]?.empGender;

      const genderTypeAbbreviations: Record<GenderTypeAbbrev, GenderTypeEnums> =
        {
          [GenderTypeAbbrev.MASCULINO]: GenderTypeEnums.MALE,
          [GenderTypeAbbrev.FEMENINO]: GenderTypeEnums.FEMALE,
        };

      const genderTypeNumberForInsert =
        genderTypeAbbreviations[genderTypeAbbrev];

      const genderTypeOfUserIdNumber = await this.genderRepository.findOne({
        where: {
          name: genderTypeNumberForInsert,
        },
      });

      if (!genderTypeOfUserIdNumber) {
        throw new HttpException(
          `Género no encontrado en base de datos.`,
          HttpStatus.CONFLICT,
        );
      }

      const genderTypeId = genderTypeOfUserIdNumber.id;

      return [
        allData,
        {
          idTypeIdNumber: idTypeId,
          genderTypeIdNumber: genderTypeId,
        },
      ];
    } catch (error) {
      throw new HttpException(
        'Hubo un error al consultar en la base de datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async searchCollaborator({ idType, idNumber }: SearchCollaboratorDto) {
    const idTypeOfUser = await this.idTypeRepository.findOne({
      where: {
        id: idType,
      },
    });

    if (!idTypeOfUser) {
      throw new HttpException(
        `Tipo de identificación no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const idTypeName = idTypeOfUser.name;

    const idTypeAbbreviations: Record<string, string> = {
      [IdTypeEnum.CITIZENSHIP_CARD]: IdTypeAbbrev.CÉDULA_DE_CIUDADANÍA,
      [IdTypeEnum.FOREIGNER_ID]: IdTypeAbbrev.CÉDULA_DE_EXTRANJERÍA,
      [IdTypeEnum.IDENTITY_CARD]: IdTypeAbbrev.TARJETA_DE_IDENTIDAD,
      [IdTypeEnum.CIVIL_REGISTRATION]: IdTypeAbbrev.REGISTRO_CIVIL,
      [IdTypeEnum.PASSPORT]: IdTypeAbbrev.PASAPORTE,
      [IdTypeEnum.SPECIAL_PERMIT]: IdTypeAbbrev.PERMISO_ESPECIAL,
      [IdTypeEnum.TEMPORARY_PROTECTION_PERMIT]:
        IdTypeAbbrev.PERMISO_PROTECCIÓN_TEMPORAL,
      [IdTypeEnum.DIPLOMATIC_CARD]: IdTypeAbbrev.CARNET_DIPLOMÁTICO,
      [IdTypeEnum.NIT]: IdTypeAbbrev.NIT,
      [IdTypeEnum.PASS]: IdTypeAbbrev.SALVOCONDUCTO,
      [IdTypeEnum.NOT_APPLICABLE]: IdTypeAbbrev.NO_APLICA,
    };

    const idTypeNameForConsult = idTypeAbbreviations[idTypeName] || '';

    const data = await this.validateThatTheCollaboratorExist({
      idType: idTypeNameForConsult,
      idNumber: idNumber,
    });

    const collaboratorData = data[0]?.data;

    if (!collaboratorData) {
      throw new HttpException(
        `El colaborador con número de identificación ${idNumber} no esta registrado en la base de datos de la clínica.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return data;
  }

  async createUserCollaborator(
    userCollaborator: CreateUserDto,
    @Req() requestAuditLog: any,
  ) {
    const data = await this.searchCollaborator({
      idType: userCollaborator.user_id_type,
      idNumber: userCollaborator.id_number,
    });

    const collaboratorData = data[0]?.data?.[0];

    const idTypeNumber: number = data[1]?.idTypeIdNumber;
    const genderTypeIdNumber: number = data[1]?.genderTypeIdNumber;

    if (!collaboratorData) {
      throw new HttpException(
        `El colaborador con número de identificación ${userCollaborator.id_number} no esta registrado en la base de datos de la clínica.`,
        HttpStatus.NOT_FOUND,
      );
    }

    userCollaborator.user_id_type = idTypeNumber;
    userCollaborator.user_gender = genderTypeIdNumber;

    userCollaborator.name = collaboratorData?.empName.trim();
    userCollaborator.last_name = collaboratorData?.empLastName.trim();
    userCollaborator.principal_email = collaboratorData?.empEmail.trim();
    userCollaborator.personal_email = collaboratorData?.empEmail.trim();
    userCollaborator.personal_cellphone = collaboratorData?.empPhone.trim();
    userCollaborator.birthdate = collaboratorData?.empBirthDate.trim();
    userCollaborator.collaborator_immediate_boss =
      collaboratorData?.empImmediateBoss.trim();
    userCollaborator.collaborator_position =
      collaboratorData?.empPosition.trim();

    const serviceOfCompany = collaboratorData?.empCostCenter
      .replace(/\d+/g, '')
      .trim();
    userCollaborator.collaborator_service = serviceOfCompany;

    const userCollaboratorFound = await this.userRepository.findOne({
      where: {
        id_number: userCollaborator.id_number,
      },
    });

    if (userCollaboratorFound) {
      throw new HttpException(
        `El usuario con número de identificación ${userCollaborator.id_number} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userCollaboratorPrincipalEmailFound =
      await this.userRepository.findOne({
        where: {
          principal_email: userCollaborator.principal_email,
        },
      });

    if (userCollaboratorPrincipalEmailFound) {
      throw new HttpException(
        `El correo principal ${userCollaborator.principal_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userCollaboratorPersonalEmailFound =
      await this.userRepository.findOne({
        where: {
          personal_email: userCollaborator.personal_email,
        },
      });

    if (userCollaboratorPersonalEmailFound) {
      throw new HttpException(
        `El correo personal ${userCollaborator.personal_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const isCorporateEmail = await validateCorporateEmail(
      userCollaborator.corporate_email,
    );

    if (!isCorporateEmail) {
      throw new HttpException(
        `El email : ${userCollaborator.corporate_email} no es un correo corporativo válido.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const collaboratorServiceTypeFound =
      await this.serviceTypeRepository.findOne({
        where: {
          id: userCollaborator.collaborator_service_type,
        },
      });

    if (!collaboratorServiceTypeFound) {
      throw new HttpException(
        `Tipo de servicio no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const collaboratorPositionLevelFound =
      await this.positionLevelRepository.findOne({
        where: {
          id: userCollaborator.collaborator_position_level,
        },
      });

    if (!collaboratorPositionLevelFound) {
      throw new HttpException(
        `Nivel de cargo no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const userCollaboratorCreate =
      await this.userRepository.create(userCollaborator);

    const collaboratorRole = await this.roleRepository.findOne({
      where: { name: RolesEnum.COLLABORATOR },
    });

    if (!collaboratorRole) {
      throw new HttpException(
        `El role ${RolesEnum.COLLABORATOR} no existe.`,
        HttpStatus.CONFLICT,
      );
    } else {
      userCollaboratorCreate.role = [collaboratorRole];
    }

    const userCollaboratorSave = await this.userRepository.save(
      userCollaboratorCreate,
    );

    const userProfile = new UserProfile();

    userProfile.user = userCollaboratorSave;
    userProfile.residence_address = collaboratorData?.empAddress;

    const userProfileCreate =
      await this.userProfileRepository.create(userProfile);

    userCollaboratorSave.user_profile = userProfileCreate;

    await this.permissionsService.assignDefaultPermissionsToUser(
      userCollaboratorSave,
      userCollaborator.collaborator_position,
    );

    const userSessionLog = new UserSessionLog();

    userSessionLog.user = userCollaboratorSave;

    const userSessionCreate =
      await this.userSessionLogRepository.create(userSessionLog);

    userCollaboratorSave.user_session_log = userSessionCreate;

    await this.userRepository.save(userCollaboratorSave);

    const userCollaboratorCreated = await this.userRepository.findOne({
      where: { id: userCollaboratorSave.id },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.CREATE_USER,
      query_type: QueryTypesEnum.POST,
      module_name: ModuleNameEnum.USER_MODULE,
      module_record_id: userCollaboratorCreated.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [userCollaboratorCreated.principal_email];
    emailDetailsToSend.userNameToEmail = userCollaboratorCreated.name;
    emailDetailsToSend.subject = SUBJECT_ACCOUNT_CREATED;
    emailDetailsToSend.emailTemplate = ACCOUNT_CREATED;
    emailDetailsToSend.bonnaHubUrl = process.env.BONNA_HUB_URL;
    emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return userCollaboratorCreated;
  }

  async createUserCollaboratorFromBonnadonaHub(
    userCollaborator: CreateUserDto,
    @Req() requestAuditLog: any,
  ) {
    const idNumber = userCollaborator.id_number;
    userCollaborator.password = await bcryptjs.hash(String(idNumber), 10);
    const userCollaboratorFound = await this.userRepository.findOne({
      where: {
        id_number: userCollaborator.id_number,
      },
    });

    if (userCollaboratorFound) {
      throw new HttpException(
        `El usuario con número de identificación ${userCollaborator.id_number} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userCollaboratorPrincipalEmailFound =
      await this.userRepository.findOne({
        where: {
          principal_email: userCollaborator.principal_email,
        },
      });

    if (userCollaboratorPrincipalEmailFound) {
      throw new HttpException(
        `El correo principal ${userCollaborator.principal_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userCollaboratorPersonalEmailFound =
      await this.userRepository.findOne({
        where: {
          personal_email: userCollaborator.personal_email,
        },
      });

    if (userCollaboratorPersonalEmailFound) {
      throw new HttpException(
        `El correo personal ${userCollaborator.personal_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    if (userCollaborator.corporate_email) {
      const isCorporateEmail = await validateCorporateEmail(
        userCollaborator.corporate_email,
      );

      if (!isCorporateEmail) {
        throw new HttpException(
          `El email: ${userCollaborator.corporate_email} no es un correo corporativo válido.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const collaboratorServiceTypeFound =
      await this.serviceTypeRepository.findOne({
        where: {
          id: userCollaborator.collaborator_service_type,
        },
      });

    if (!collaboratorServiceTypeFound) {
      throw new HttpException(
        `Tipo de servicio no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const collaboratorPositionLevelFound =
      await this.positionLevelRepository.findOne({
        where: {
          id: userCollaborator.collaborator_position_level,
        },
      });

    if (!collaboratorPositionLevelFound) {
      throw new HttpException(
        `Nivel de cargo no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    userCollaborator.from_kactus = false;

    const userCollaboratorCreate =
      await this.userRepository.create(userCollaborator);

    const collaboratorRole = await this.roleRepository.findOne({
      where: { name: RolesEnum.COLLABORATOR },
    });

    if (!collaboratorRole) {
      throw new HttpException(
        `El role ${RolesEnum.COLLABORATOR} no existe.`,
        HttpStatus.CONFLICT,
      );
    } else {
      userCollaboratorCreate.role = [collaboratorRole];
    }

    const userCollaboratorSave = await this.userRepository.save(
      userCollaboratorCreate,
    );

    const userProfile = new UserProfile();

    userProfile.user = userCollaboratorSave;

    const userProfileCreate =
      await this.userProfileRepository.create(userProfile);

    userCollaboratorSave.user_profile = userProfileCreate;

    await this.permissionsService.assignDefaultPermissionsToUser(
      userCollaboratorSave,
      userCollaborator.collaborator_position,
    );

    const userSessionLog = new UserSessionLog();

    userSessionLog.user = userCollaboratorSave;

    const userSessionCreate =
      await this.userSessionLogRepository.create(userSessionLog);

    userCollaboratorSave.user_session_log = userSessionCreate;

    await this.userRepository.save(userCollaboratorSave);

    const userCollaboratorCreated = await this.userRepository.findOne({
      where: { id: userCollaboratorSave.id },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.CREATE_USER,
      query_type: QueryTypesEnum.POST,
      module_name: ModuleNameEnum.USER_MODULE,
      module_record_id: userCollaboratorCreated.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [userCollaboratorCreated.principal_email];
    emailDetailsToSend.userNameToEmail = userCollaboratorCreated.name;
    emailDetailsToSend.subject = SUBJECT_ACCOUNT_CREATED;
    emailDetailsToSend.emailTemplate = ACCOUNT_CREATED;
    emailDetailsToSend.bonnaHubUrl = process.env.BONNA_HUB_URL;
    emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return userCollaboratorCreated;
  }

  async createAllNewUsersCollaboratorsFromKactus(
    userCollaborator: CreateUserDto,
  ) {
    const userCollaboratorFound = await this.userRepository.findOne({
      where: {
        id_number: userCollaborator.id_number,
      },
    });

    if (userCollaboratorFound) {
      throw new HttpException(
        `El usuario con número de identificación ${userCollaborator.id_number} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userCollaboratorPrincipalEmailFound =
      await this.userRepository.findOne({
        where: {
          principal_email: userCollaborator.principal_email,
        },
      });

    if (userCollaboratorPrincipalEmailFound) {
      throw new HttpException(
        `El correo principal ${userCollaborator.principal_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userCollaboratorPersonalEmailFound =
      await this.userRepository.findOne({
        where: {
          personal_email: userCollaborator.personal_email,
        },
      });

    if (userCollaboratorPersonalEmailFound) {
      throw new HttpException(
        `El correo personal ${userCollaborator.personal_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const collaboratorServiceTypeFound =
      await this.serviceTypeRepository.findOne({
        where: {
          id: userCollaborator.collaborator_service_type,
        },
      });

    if (!collaboratorServiceTypeFound) {
      throw new HttpException(
        `Tipo de servicio no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const collaboratorPositionLevelFound =
      await this.positionLevelRepository.findOne({
        where: {
          id: userCollaborator.collaborator_position_level,
        },
      });

    if (!collaboratorPositionLevelFound) {
      throw new HttpException(
        `Nivel de cargo no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const userCollaboratorCreate =
      await this.userRepository.create(userCollaborator);

    const collaboratorRole = await this.roleRepository.findOne({
      where: { name: RolesEnum.COLLABORATOR },
    });

    if (!collaboratorRole) {
      throw new HttpException(
        `El role ${RolesEnum.COLLABORATOR} no existe.`,
        HttpStatus.CONFLICT,
      );
    } else {
      userCollaboratorCreate.role = [collaboratorRole];
    }

    const userCollaboratorSave = await this.userRepository.save(
      userCollaboratorCreate,
    );

    const userProfile = new UserProfile();

    userProfile.user = userCollaboratorSave;
    userProfile.residence_address = userCollaborator?.residence_address;

    const userProfileCreate =
      await this.userProfileRepository.create(userProfile);

    userCollaboratorSave.user_profile = userProfileCreate;

    await this.permissionsService.assignDefaultPermissionsToUser(
      userCollaboratorSave,
      userCollaborator.collaborator_position,
    );

    const userSessionLog = new UserSessionLog();

    userSessionLog.user = userCollaboratorSave;

    const userSessionCreate =
      await this.userSessionLogRepository.create(userSessionLog);

    userCollaboratorSave.user_session_log = userSessionCreate;

    await this.userRepository.save(userCollaboratorSave);

    const userCollaboratorCreated = await this.userRepository.findOne({
      where: { id: userCollaboratorSave.id },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    // const emailDetailsToSend = new SendEmailDto();

    // emailDetailsToSend.recipients = [userCollaboratorCreated.principal_email];
    // emailDetailsToSend.userNameToEmail = userCollaboratorCreated.name;
    // emailDetailsToSend.subject = SUBJECT_ACCOUNT_CREATED;
    // emailDetailsToSend.emailTemplate = ACCOUNT_CREATED;
    // emailDetailsToSend.bonnaHubUrl = process.env.BONNA_HUB_URL;
    // emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;

    // await this.nodemailerService.sendEmail(emailDetailsToSend);

    return userCollaboratorCreated;
  }

  async updateUserDataFromKactus(userId: string) {
    const userFound = await this.userRepository.findOne({
      where: { id: userId, is_active: true },
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    const data = await this.searchCollaborator({
      idType: userFound.user_id_type,
      idNumber: userFound.id_number,
    });

    const collaboratorData = data[0]?.data?.[0];

    if (!collaboratorData) {
      throw new HttpException(
        `No se encontraron datos en Kactus para el usuario con número de identificación: ${userFound.id_number}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    let hasChanges = false;

    if (userFound.birthdate !== collaboratorData.empBirthDate.trim()) {
      userFound.birthdate = collaboratorData.empBirthDate.trim();
      hasChanges = true;
    }

    if (
      userFound.collaborator_immediate_boss !==
      collaboratorData.empImmediateBoss.trim()
    ) {
      userFound.collaborator_immediate_boss =
        collaboratorData.empImmediateBoss.trim();
      hasChanges = true;
    }

    if (
      userFound.collaborator_position !== collaboratorData.empPosition.trim()
    ) {
      userFound.collaborator_position = collaboratorData.empPosition.trim();
      hasChanges = true;
    }

    const serviceOfCompany = collaboratorData.empCostCenter
      .replace(/\d+/g, '')
      .trim();

    if (userFound.collaborator_service !== serviceOfCompany) {
      userFound.collaborator_service = serviceOfCompany;
      hasChanges = true;
    }

    if (hasChanges) {
      await this.userRepository.save(userFound);

      return { message: 'Datos del usuario actualizados correctamente.' };
    }

    return {
      message: 'No se detectaron cambios en los datos del usuario.',
    };
  }

  async updateAllUsersDataFromKactus() {
    try {
      const allUsers = await this.userRepository.find({
        where: { is_active: true },
      });

      if (allUsers.length === 0) {
        throw new HttpException(
          'No hay usuarios activos para actualizar.',
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedUsers = [];

      for (const user of allUsers) {
        const data = await this.searchCollaborator({
          idType: user.user_id_type,
          idNumber: user.id_number,
        });

        const collaboratorData = data[0]?.data?.[0];

        if (!collaboratorData) {
          console.log(
            `No se encontraron datos en Kactus para el usuario con número de identificación: ${user.id_number}.`,
          );
          continue;
        }

        let hasChanges = false;

        if (user.birthdate !== collaboratorData.empBirthDate.trim()) {
          user.birthdate = collaboratorData.empBirthDate.trim();
          hasChanges = true;
        }

        if (
          user.collaborator_immediate_boss !==
          collaboratorData.empImmediateBoss.trim()
        ) {
          user.collaborator_immediate_boss =
            collaboratorData.empImmediateBoss.trim();
          hasChanges = true;
        }

        if (
          user.collaborator_position !== collaboratorData.empPosition.trim()
        ) {
          user.collaborator_position = collaboratorData.empPosition.trim();
          hasChanges = true;
        }

        const serviceOfCompany = collaboratorData.empCostCenter
          .replace(/\d+/g, '')
          .trim();

        if (user.collaborator_service !== serviceOfCompany) {
          user.collaborator_service = serviceOfCompany;
          hasChanges = true;
        }

        if (user.personal_email !== collaboratorData.empEmail) {
          user.personal_email = collaboratorData.empEmail.trim();
          hasChanges = true;
        }

        if (user.personal_cellphone !== collaboratorData.empPhone) {
          user.personal_cellphone = collaboratorData.empPhone.trim();
          hasChanges = true;
        }

        if (hasChanges) {
          await this.userRepository.save(user);

          updatedUsers.push(user);
        }
      }

      return {
        message: `Se actualizaron los datos de ${updatedUsers.length} usuario(s).`,
        updatedUsers,
      };
    } catch (error) {
      console.error('Error al actualizar datos de usuarios:', error);
      throw new HttpException(
        'Hubo un error al actualizar los datos de los usuarios.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // GET FUNTIONS //

  async getAllActiveUsers() {
    const allUsers = await this.userRepository.find({
      where: {
        is_active: true,
      },
      order: {
        name: 'ASC',
      },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    if (!allUsers.length) {
      throw new HttpException(
        `No hay usuarios registrados en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allUsers;
    }
  }

  async getAllUsers() {
    const allUsers = await this.userRepository.find({
      order: {
        name: 'ASC',
      },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    if (!allUsers.length) {
      throw new HttpException(
        `No hay usuarios registrados en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allUsers;
    }
  }

  async getAllUsersWithProfile() {
    const allUsersWithProfile = await this.userRepository.find({
      order: {
        name: 'ASC',
      },
    });

    if (!allUsersWithProfile.length) {
      throw new HttpException(
        `No hay usuarios registrados en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      const result = [];

      allUsersWithProfile.map((item) => {
        const userPermissionsId = item.permission?.map(
          (permission, index: number) => permission.id,
        );

        const userRoleId = item.role?.map((role, index: number) => role.id);

        result.push({
          id: item.id,
          name: item.name,
          last_name: item.last_name,
          user_id_type: item.user_id_type,
          id_number: item.id_number,
          user_gender: item.user_gender,
          birthdate: item.birthdate,
          principal_email: item.principal_email,
          corporate_email: item.corporate_email,
          personal_email: item.personal_email,
          personal_cellphone: item.personal_cellphone,
          corporate_cellphone: item.corporate_cellphone,
          collaborator_service_type: item.collaborator_service_type,
          collaborator_immediate_boss: item.collaborator_immediate_boss,
          collaborator_unit: item.collaborator_unit,
          collaborator_service: item.collaborator_service,
          collaborator_position: item.collaborator_position,
          collaborator_position_level: item.collaborator_position_level,
          password: item.password,
          reset_password_token: item.reset_password_token,
          last_password_update: item.last_password_update,
          verification_code: item.verification_code,
          is_active: item.is_active,
          banned_user_until: item.banned_user_until,
          user_profile: item.user_profile,
          user_session_log: item.user_session_log,
          user_blood_group: item.user_profile?.user_blood_group,
          profile_photo: item.user_profile?.profile_photo,
          affiliation_eps: item.user_profile?.affiliation_eps,
          residence_department: item.user_profile?.residence_department,
          residence_city: item.user_profile?.residence_city,
          residence_address: item.user_profile?.residence_address,
          residence_neighborhood: item.user_profile?.residence_neighborhood,
          digital_signature: item.user_profile?.digital_signature,
          user_height: item.user_profile?.user_height,
          user_weight: item.user_profile?.user_weight,
          user_shirt_size: item.user_profile?.user_shirt_size,
          user_pants_size: item.user_profile?.user_pants_size,
          user_shoe_size: item.user_profile?.user_shoe_size,
          role: userRoleId,
          permission: userPermissionsId,
        });
      });

      return result;
    }
  }

  async getUserById(id: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id,
        is_active: true,
      },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    } else {
      return userFound;
    }
  }

  async getUserActiveProfileById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId, is_active: true },
    });

    if (!user) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    return user.user_profile;
  }

  async getUserProfileById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    return user.user_profile;
  }

  async getUserSessionLogByEmail(principalEmail: string) {
    const user = await this.userRepository.findOne({
      where: { principal_email: principalEmail, is_active: true },
    });

    if (!user) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    return user.user_session_log;
  }

  async getUserByIdNumberAndRole(idNumber: number, userRoles: RolesEnum[]) {
    const userFound = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where('user.id_number = :idNumber', { idNumber })
      .andWhere('role.name IN (:...roles)', { roles: userRoles })
      .andWhere('user.is_active = :isActive', { isActive: true })
      .getOne();

    if (userFound) {
      throw new HttpException(
        `El usuario con número de identificación: ${idNumber} ya esta registrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return userFound;
  }

  async getUserActiveByIdNumber(id_number: number) {
    return await this.userRepository.findOneBy({
      id_number: id_number,
      is_active: true,
    });
  }

  async getUserByIdNumber(id_number: number) {
    return await this.userRepository.findOneBy({
      id_number: id_number,
    });
  }

  async getUserActiveByEmail(principal_email: string) {
    return await this.userRepository.findOneBy({
      principal_email: principal_email,
      is_active: true,
    });
  }

  async getUserFoundByEmailWithPassword(principalEmail: string) {
    return await this.userRepository.findOne({
      where: {
        principal_email: principalEmail,
        is_active: true,
      },
      select: [
        'id',
        'name',
        'last_name',
        'user_id_type',
        'id_number',
        'password',
        'principal_email',
        'role',
      ],
      loadEagerRelations: false,
    });
  }

  async getUserActiveByEmailAndCode(
    principalEmail: string,
    verificationCode: number,
  ) {
    return await this.userRepository.findOne({
      where: {
        principal_email: principalEmail,
        verification_code: verificationCode,
        is_active: true,
      },
      select: ['id', 'name', 'last_name', 'principal_email', 'id_number'],
      loadEagerRelations: false,
      relations: { role: true },
    });
  }

  async getUserRoles(idNumber: number) {
    const userFound = await this.userRepository.findOne({
      where: { id_number: idNumber, is_active: true },
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    if (!userFound.role.length) {
      throw new HttpException(
        `Este usuario no tiene roles asignados.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const transformedRoles = userFound.role.map((role) => ({
      id: role.id,
      name: role.name,
    }));

    return transformedRoles;
  }

  async getUserPermissions(idNumber: number) {
    const userFound = await this.userRepository.findOne({
      where: { id_number: idNumber, is_active: true },
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    if (!userFound.permission.length) {
      throw new HttpException(
        `Este usuario no tiene permisos asignados.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const transformedPermissions = userFound.permission.map((permission) => ({
      id: permission.id,
      name: permission.name,
      description: permission.description,
      applications: permission.applications.map((app) => ({
        id: app.id,
        name: app.name,
        image_path: app.image_path,
        entry_link: app.entry_link,
        is_active: app.is_active,
      })),
      application_modules: permission.application_modules.map((module) => ({
        id: module.id,
        name: module.name,
        app_id: module.app_id,
      })),
      module_actions: permission.module_actions.map((action) => ({
        id: action.id,
        name: action.name,
        app_module_id: action.app_module_id,
      })),
    }));

    return transformedPermissions;
  }

  async getAllColaboratorPositions() {
    const positions = await this.userRepository
      .createQueryBuilder('user')
      .select('user.collaborator_position')
      .orderBy('user.collaborator_position', 'ASC')
      .distinct(true)
      .getRawMany();

    return positions.map((position) => position.user_collaborator_position);
  }

  async getAllColaboratorService() {
    const service = await this.userRepository
      .createQueryBuilder('user')
      .select('user.collaborator_service')
      .orderBy('user.collaborator_service', 'ASC')
      .distinct(true)
      .getRawMany();

    return service.map((service) => service.user_collaborator_service);
  }

  // UPDATE FUNTIONS //

  async updateUser(
    id: string,
    updateUser: UpdateUserDto,
    @Req() requestAuditLog: any,
  ) {
    const userFound = await this.userRepository.findOneBy({
      id,
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    const principalEmailUserValidate = await this.userRepository.findOne({
      where: {
        id: Not(userFound.id),
        principal_email: updateUser.principal_email,
      },
    });

    if (updateUser.principal_email && principalEmailUserValidate) {
      throw new HttpException(
        `El correo electrónico ${updateUser.principal_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const personalEmailUserValidate = await this.userRepository.findOne({
      where: {
        id: Not(userFound.id),
        personal_email: updateUser.personal_email,
      },
    });

    if (updateUser.personal_email && personalEmailUserValidate) {
      throw new HttpException(
        `El correo electrónico ${updateUser.personal_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    if (updateUser.corporate_email) {
      const isCorporateEmail = await validateCorporateEmail(
        updateUser.corporate_email,
      );

      if (!isCorporateEmail) {
        throw new HttpException(
          `El email : ${updateUser.corporate_email} no es un correo corporativo válido.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const personalCellphoneUserValidate = await this.userRepository.findOne({
      where: {
        id: Not(userFound.id),
        personal_cellphone: updateUser.personal_cellphone,
      },
    });

    if (updateUser.personal_cellphone && personalCellphoneUserValidate) {
      throw new HttpException(
        `El número de celular ${updateUser.personal_cellphone} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const collaboratorServiceTypeValidate =
      await this.serviceTypeRepository.findOne({
        where: {
          id: updateUser.collaborator_service_type,
        },
      });

    if (
      updateUser.collaborator_service_type &&
      !collaboratorServiceTypeValidate
    ) {
      throw new HttpException(
        `Tipo de servicio no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const collaboratorPositionLevelValidate =
      await this.positionLevelRepository.findOne({
        where: {
          id: updateUser.collaborator_position_level,
        },
      });

    if (
      updateUser.collaborator_position_level &&
      !collaboratorPositionLevelValidate
    ) {
      throw new HttpException(
        `Nivel de cargo no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const { roleIdsToAdd, permissionIdsToAdd, ...userUpdates } = updateUser;

    const userUpdate = await this.userRepository.update(id, userUpdates);

    if (roleIdsToAdd) {
      await this.updateUserRoles(id, roleIdsToAdd, requestAuditLog);
    }

    if (permissionIdsToAdd) {
      await this.updateUserPermissions(id, permissionIdsToAdd, requestAuditLog);
    }

    if (userUpdate.affected === 0) {
      throw new HttpException(`Usuario no encontrado`, HttpStatus.NOT_FOUND);
    }

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.UPDATE_DATA_USER,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.USER_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    throw new HttpException(
      `¡Datos y roles guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async updateUserProfile(
    id: string,
    userProfile: UpdateUserProfileDto,
    @Req() requestAuditLog: any,
  ) {
    const userFound = await this.userRepository.findOneBy({
      id,
      is_active: true,
    });

    if (!userFound) {
      return new HttpException(
        `Usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const requiredRoles = [
      RolesEnum.SUPER_ADMIN,
      RolesEnum.ADMIN,
      RolesEnum.COLLABORATOR,
    ];

    const hasRequiredRole = userFound.role.some((role) =>
      requiredRoles.includes(role.name),
    );

    if (!hasRequiredRole) {
      return new HttpException(
        `No tienes permiso para actualizar este usuario.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const bloodGroupFound = await this.bloodGroupRepository.findOne({
      where: {
        id: userProfile.user_blood_group,
      },
    });

    if (userProfile.user_blood_group && !bloodGroupFound) {
      throw new HttpException(
        `Grupo sanguíneo no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const updateUserProfile = await this.userProfileRepository.update(
      { id: userFound.user_profile.id },
      userProfile,
    );

    if (updateUserProfile.affected === 0) {
      return new HttpException(`Usuario no encontrado`, HttpStatus.CONFLICT);
    }

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.UPDATE_DATA_USER_PROFILE,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.USER_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  private async processDigitalSignature(base64Data: string): Promise<string> {
    try {
      const base64String = base64Data.split(',')[1];
      const buffer = Buffer.from(base64String, 'base64');

      const optimizedBuffer = await sharp(buffer)
        .resize(207, 113)
        .toColourspace('b-w')
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .png({
          quality: 7,
          compressionLevel: 9,
          adaptiveFiltering: true,
          bitdepth: 8,
        })
        .withMetadata(false)
        .toBuffer();

      return `data:image/png;base64,${optimizedBuffer.toString('base64')}`;
    } catch (error) {
      throw new HttpException(
        `Error al procesar la firma digital: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserDigitalSignature(
    userId: string,
    { digital_signature }: CreateDigitalSignatureDto,
  ) {
    const userFound = await this.userRepository.findOneBy({
      id: userId,
      is_active: true,
    });

    if (!userFound) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.CONFLICT);
    }

    if (!digital_signature) {
      throw new HttpException('Firma no encontrada.', HttpStatus.CONFLICT);
    }

    const optimizedSignature =
      await this.processDigitalSignature(digital_signature);

    userFound.user_profile.digital_signature = optimizedSignature;

    await this.userProfileRepository.update(
      { id: userFound.user_profile.id },
      userFound.user_profile,
    );

    throw new HttpException(
      '¡Datos guardados correctamente!',
      HttpStatus.ACCEPTED,
    );
  }

  async updateUserRoles(
    id: string,
    roleIdsToAdd: number[],
    @Req() requestAuditLog: any,
  ) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    if (roleIdsToAdd && roleIdsToAdd.length > 0) {
      const rolesToAdd = await this.roleRepository.findBy({
        id: In(roleIdsToAdd),
      });

      if (rolesToAdd.length !== roleIdsToAdd.length) {
        throw new HttpException(
          `Uno o más roles no existen`,
          HttpStatus.NOT_FOUND,
        );
      }

      userFound.role = rolesToAdd;
    }

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.UPDATE_USER_ROLES,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.USER_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    await this.userRepository.save(userFound);
  }

  async updateUserPermissions(
    id: string,
    permissionIdsToAdd: string[],
    @Req() requestAuditLog: any,
  ) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    if (permissionIdsToAdd && permissionIdsToAdd.length > 0) {
      const rolesToAdd = await this.permissionRepository.findBy({
        id: In(permissionIdsToAdd),
      });

      if (rolesToAdd.length !== permissionIdsToAdd.length) {
        throw new HttpException(
          `Uno o más roles no existen`,
          HttpStatus.NOT_FOUND,
        );
      }

      userFound.permission = rolesToAdd;
    }

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.UPDATE_USER_PERMISSIONS,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.USER_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    await this.userRepository.save(userFound);
  }

  async updateUserPassword(
    id: string,
    passwords: UpdatePasswordUserDto,
    @Req() requestAuditLog: any,
  ) {
    const userFound = await this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.password'])
      .where('user.id = :id', { id })
      .getOne();

    if (!userFound) {
      throw new HttpException(
        `Usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcryptjs.compare(
      passwords.oldPassword,
      userFound.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        `Contraseña antigua incorrecta.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isNewPasswordSameAsOld = await bcryptjs.compare(
      passwords.newPassword,
      userFound.password,
    );

    if (isNewPasswordSameAsOld) {
      throw new HttpException(
        `La nueva contraseña no puede ser igual a la antigua.`,
        HttpStatus.CONFLICT,
      );
    }

    const passwordPolicy = await this.passwordPolicyService.getPasswordPolicy();

    if (!passwordPolicy) {
      throw new HttpException(
        `No hay política de contraseña definida`,
        HttpStatus.CONFLICT,
      );
    }

    this.validatePasswordPolicy(passwords.newPassword, passwordPolicy);

    const isPasswordInHistory =
      await this.passwordHistoryService.isPasswordInHistory(
        id,
        passwords.newPassword,
        passwordPolicy.password_history_limit,
      );

    if (isPasswordInHistory) {
      throw new HttpException(
        `La nueva contraseña no puede ser igual a ninguna de las últimas ${passwordPolicy.password_history_limit} contraseñas utilizadas.`,
        HttpStatus.CONFLICT,
      );
    }

    this.validatePersonalDataInPassword(userFound, passwords.newPassword);

    const hashedNewPassword = await bcryptjs.hash(passwords.newPassword, 10);
    const lastPasswordUpdateDate = await new Date();

    await this.userRepository.update(id, {
      password: hashedNewPassword,
      last_password_update: lastPasswordUpdateDate,
    });

    await this.passwordHistoryService.addPasswordToHistory(
      id,
      hashedNewPassword,
    );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [userFound.principal_email];
    emailDetailsToSend.userNameToEmail = userFound.name;
    emailDetailsToSend.subject = PASSWORD_UPDATED;
    emailDetailsToSend.emailTemplate = UPDATED_PASSWORD_TEMPLATE;
    emailDetailsToSend.bonnaHubUrl = process.env.BONNA_HUB_URL;
    emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.UPDATE_PASSWORD_ACCOUNT,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.USER_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return new HttpException(
      `¡Contraseña actualizada correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  private validatePasswordPolicy(password: string, policy: PasswordPolicy) {
    if (password.length < policy.min_length) {
      throw new HttpException(
        `La contraseña debe tener al menos ${policy.min_length} caracteres.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (policy.require_uppercase && !/[A-Z]/.test(password)) {
      throw new HttpException(
        `La contraseña debe contener al menos una letra mayúscula.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (policy.require_lowercase && !/[a-z]/.test(password)) {
      throw new HttpException(
        `La contraseña debe contener al menos una letra minúscula.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (policy.require_numbers && !/[0-9]/.test(password)) {
      throw new HttpException(
        `La contraseña debe contener al menos un número.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      policy.require_special_characters &&
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      throw new HttpException(
        `La contraseña debe contener al menos un carácter especial.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validatePersonalDataInPassword(user: User, newPassword: string) {
    const passwordUpperCase = newPassword.toUpperCase();

    const fullName = `${user.name} ${user.last_name}`.toUpperCase();

    if (fullName.split(' ').some((word) => passwordUpperCase.includes(word))) {
      throw new HttpException(
        `¡La contraseña no puede contener datos del nombre del usuario!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const idNumber = String(user.id_number);
    if (passwordUpperCase.includes(idNumber)) {
      throw new HttpException(
        `¡La contraseña no puede contener datos del número de identificación del usuario!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const cellphoneNumber = String(user.corporate_cellphone);
    const personalCellphoneNumber = String(user.personal_cellphone);

    if (
      passwordUpperCase.includes(cellphoneNumber) ||
      passwordUpperCase.includes(personalCellphoneNumber)
    ) {
      throw new HttpException(
        `¡La contraseña no puede contener datos del número de celular del usuario!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const principalEmail = user.principal_email.toUpperCase();

    if (passwordUpperCase.includes(principalEmail)) {
      throw new HttpException(
        `¡La contraseña no puede contener el correo electrónico principal del usuario!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const corporateEmail = user.corporate_email?.toUpperCase();

    if (corporateEmail && passwordUpperCase.includes(corporateEmail)) {
      throw new HttpException(
        `¡La contraseña no puede contener el correo electrónico corporativo del usuario!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const birthdate = user?.birthdate.toString().replace(/\s+/g, '').split('-');

    if (birthdate?.some((date) => passwordUpperCase?.includes(date))) {
      throw new HttpException(
        `¡La contraseña no puede contener datos de la fecha de nacimiento del usuario!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async forgotUserPassword({
    user_id_type,
    id_number,
    birthdate,
  }: ForgotPasswordUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        user_id_type: user_id_type,
        id_number: id_number,
        birthdate: birthdate,
        is_active: true,
      },
    });

    if (userFound) {
      const resetPasswordToken = nanoid(64);

      await this.userRepository.update(
        {
          id: userFound.id,
        },
        { reset_password_token: resetPasswordToken },
      );

      const emailDetailsToSend = new SendEmailDto();

      emailDetailsToSend.recipients = [userFound.principal_email];
      emailDetailsToSend.userNameToEmail = userFound.name;
      emailDetailsToSend.subject = PASSWORD_RESET;
      emailDetailsToSend.emailTemplate = RESET_PASSWORD_TEMPLATE;
      emailDetailsToSend.resetPasswordUrl = `${process.env.RESET_PASSWORD_URL_USER}?token=${resetPasswordToken}`;

      await this.nodemailerService.sendEmail(emailDetailsToSend);

      schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
        await this.userRepository.update(
          { id: userFound.id },
          { reset_password_token: null },
        );
      });

      const maskedEmail = maskEmailUser(userFound.principal_email);

      return new HttpException(
        `Se ha enviado al correo: ${maskedEmail} el link de restablecimiento de contraseña`,
        HttpStatus.ACCEPTED,
      );
    } else {
      throw new UnauthorizedException(
        `¡Datos incorrectos o no esta registrado!`,
      );
    }
  }

  async resetUserPassword(
    token: string,
    { newPassword }: ResetPasswordUserDto,
  ) {
    const tokenFound = await this.userRepository.findOne({
      where: {
        reset_password_token: token,
        is_active: true,
      },
    });

    if (!tokenFound) {
      throw new UnauthorizedException('¡Link invalido o caducado!');
    }

    const userFound = await this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.password'])
      .where('user.reset_password_token = :token', { token })
      .getOne();

    if (!userFound) {
      throw new HttpException(
        `Usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isNewPasswordSameAsOld = await bcryptjs.compare(
      newPassword,
      userFound.password,
    );

    if (isNewPasswordSameAsOld) {
      throw new HttpException(
        `La nueva contraseña no puede ser igual a la antigua.`,
        HttpStatus.CONFLICT,
      );
    }

    const passwordPolicy = await this.passwordPolicyService.getPasswordPolicy();

    if (!passwordPolicy) {
      throw new HttpException(
        `No hay política de contraseña definida`,
        HttpStatus.CONFLICT,
      );
    }

    this.validatePasswordPolicy(newPassword, passwordPolicy);

    const isPasswordInHistory =
      await this.passwordHistoryService.isPasswordInHistory(
        userFound.id,
        newPassword,
        passwordPolicy.password_history_limit,
      );

    if (isPasswordInHistory) {
      throw new HttpException(
        `La nueva contraseña no puede ser igual a ninguna de las últimas ${passwordPolicy.password_history_limit} contraseñas utilizadas.`,
        HttpStatus.CONFLICT,
      );
    }

    this.validatePersonalDataInPassword(userFound, newPassword);

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
    const lastPasswordUpdateDate = await new Date();

    await this.userRepository.update(userFound.id, {
      password: hashedNewPassword,
      last_password_update: lastPasswordUpdateDate,
      reset_password_token: null,
    });

    await this.passwordHistoryService.addPasswordToHistory(
      userFound.id,
      hashedNewPassword,
    );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [userFound.principal_email];
    emailDetailsToSend.userNameToEmail = userFound.name;
    emailDetailsToSend.subject = PASSWORD_UPDATED;
    emailDetailsToSend.emailTemplate = UPDATED_PASSWORD_TEMPLATE;
    emailDetailsToSend.bonnaHubUrl = process.env.BONNA_HUB_URL;
    emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return new HttpException(
      `¡Contraseña restablecida correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  // DELETED-BAN FUNTIONS //

  async banUser(id: string, @Req() requestAuditLog: any) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    const sessionLog = await this.userSessionLogRepository.findOne({
      where: { id: userFound.user_session_log.id },
    });

    if (!sessionLog) {
      throw new HttpException(
        `Session de usuario no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    userFound.is_active = !userFound.is_active;

    await this.userRepository.save(userFound);

    sessionLog.failed_login_attempts_counter = 0;
    sessionLog.number_of_user_bans = 0;

    await this.userSessionLogRepository.save(sessionLog);

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type:
        userFound.is_active === false
          ? ActionTypesEnum.BAN_USER
          : ActionTypesEnum.UNBAN_USER,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.USER_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    const statusMessage = userFound.is_active
      ? `El usuario con número de ID: ${userFound.id_number} se ha ACTIVADO.`
      : `El usuario con número de ID: ${userFound.id_number} se ha INACTIVADO.`;

    throw new HttpException(statusMessage, HttpStatus.ACCEPTED);
  }

  async banAllUsersForWithdrawalFromKactus() {
    try {
      const allUsersCreatedFromKactus = await this.userRepository.find({
        where: { is_active: true, from_kactus: true },
      });

      const allActiveUsersFromKactus =
        await this.getAllActiveCollaboratorsFromKactus();

      const activeKactusIds = new Set(
        allActiveUsersFromKactus.map((user: any) => user.empDoc),
      );

      const usersToDeactivate = allUsersCreatedFromKactus.filter(
        (user) => !activeKactusIds.has(user.id_number),
      );

      if (usersToDeactivate.length > 0) {
        const userIdsToDeactivate = usersToDeactivate.map(
          (user) => user.id_number,
        );

        await this.userRepository.update(
          { id_number: In(userIdsToDeactivate) },
          { is_active: false },
        );

        return {
          message: `Se inactivaron ${usersToDeactivate.length} usuario(s) que no están activos en Kactus.`,
          deactivatedUsers: usersToDeactivate.map((user) => ({
            nombre: user.name,
            número_identificación: user.id_number,
            cargo: user.collaborator_position,
          })),
        };
      } else {
        return {
          message: 'No se encontraron usuarios para inactivar.',
          deactivatedUsers: [],
        };
      }
    } catch (error) {
      console.error('Error al inactivar usuarios:', error);
      throw new HttpException(
        'Hubo un error al intentar inactivar usuarios.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async banAllUsersForInactivity() {
    try {
      const users = await this.userRepository.find({
        where: { is_active: true },
      });

      const passwordPolicy =
        await this.passwordPolicyService.getPasswordPolicy();

      if (!passwordPolicy) {
        throw new HttpException(
          `No hay política de contraseña definida`,
          HttpStatus.CONFLICT,
        );
      }

      const currentDate = new Date();
      const inactivityThreshold = new Date(currentDate);
      inactivityThreshold.setDate(
        currentDate.getDate() - passwordPolicy.inactivity_days,
      );

      const inactiveUsers = [];

      for (const user of users) {
        if (
          user.user_session_log &&
          user.user_session_log.last_login !== null &&
          user.user_session_log.successful_login_counter >= 1
        ) {
          const sessionLog = await this.userSessionLogRepository.findOne({
            where: { id: user.user_session_log.id },
          });

          if (!sessionLog) {
            throw new HttpException(
              `Session de usuario no encontrada para el ID: ${user.id_number}.`,
              HttpStatus.NOT_FOUND,
            );
          }

          if (sessionLog.last_login < inactivityThreshold) {
            user.is_active = false;
            inactiveUsers.push(user);
          }
        }
      }

      if (inactiveUsers.length > 0) {
        await this.userRepository.save(inactiveUsers);

        const statusMessage = `Se han inactivado ${inactiveUsers.length} usuarios por inactividad.`;

        throw new HttpException(statusMessage, HttpStatus.ACCEPTED);
      } else {
        throw new HttpException(
          'No se encontraron usuarios para inactivar.',
          HttpStatus.OK,
        );
      }
    } catch (error) {
      console.error('Error al inactivar usuarios:', error);
      throw new HttpException(
        'Hubo un error al intentar inactivar usuarios.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
