import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { UsersService } from 'src/user/services/users.service';

import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { LoginDto } from '../dto/login.dto';

import { RolesEnum } from 'src/utils/enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  // REGISTER FUNTIONS //

  async registerUserCollaborator({
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
  }: CreateUserDto) {
    await this.userService.getUserByIdNumberAndRole(id_number, [
      RolesEnum.COLLABORATOR,
    ]);

    return await this.userService.createUserCollaborator({
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
    });
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

  async loginCollaboratorUser({ principal_email, password }: LoginDto) {
    const collaboratorUserRoleFound = await this.roleRepository.find({
      where: { name: In([RolesEnum.COLLABORATOR]) },
    });

    if (!collaboratorUserRoleFound) {
      throw new UnauthorizedException(`¡Role de usuario no encontrado!`);
    }

    const collaboratorFound =
      await this.userService.getUserFoundByIdNumberWithPassword(
        principal_email,
      );

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
      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.userRepository.update(
      {
        id: collaboratorFound.id,
      },
      { verification_code: verificationCode },
    );

    return { message: 'INGRESO CORRECTO' };
  }
}
