import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    });
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

    return { message: 'INGRESO CORRECTO' };
  }
}
