import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserProfile } from 'src/user_profile/entities/user_profile.entity';
import { IdType } from 'src/id_types/entities/id_type.entity';
import { GenderType } from 'src/gender_types/entities/gender_type.entity';
import { ServiceType } from 'src/service_types/entities/service_type.entity';
import { PositionLevel } from 'src/position_levels/entities/position_level.entity';
import { Role } from 'src/role/entities/role.entity';

import { IdTypeEnum } from 'src/utils/enums/id_types.enum';
import { IdTypeAbbrev } from 'src/utils/enums/id_types_abbrev.enum';
import { GenderTypeEnums } from 'src/utils/enums/gender_types.enum';
import { GenderTypeAbbrev } from 'src/utils/enums/gender_types_abbrev.enum';
import { RolesEnum } from 'src/utils/enums/roles.enum';

import { ValidateCollaboratorDto } from '../dto/validate_collaborator.dto';
import { SearchCollaboratorDto } from '../dto/search_collaborator.dto';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';

import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,

    @InjectRepository(IdType)
    private idTypeRepository: Repository<IdType>,

    @InjectRepository(GenderType)
    private genderRepository: Repository<GenderType>,

    @InjectRepository(Role) private roleRepository: Repository<Role>,

    @InjectRepository(ServiceType)
    private serviceTypeRepository: Repository<ServiceType>,

    @InjectRepository(PositionLevel)
    private positionLevelRepository: Repository<PositionLevel>,
  ) {}

  // CREATE FUNTIONS //

  async validateThatTheCollaboratorExist({
    idType,
    idNumber,
  }: ValidateCollaboratorDto) {
    try {
      const AUTH_VALUE = process.env.X_AUTH_VALUE;

      const response = await axios.get(
        `http://190.131.222.108:8088/api/v1/eva-des/get/employees-information/${idNumber}/${idType}`,
        {
          headers: {
            'X-Authorization': AUTH_VALUE,
          },
        },
      );

      const allData = response?.data;

      if (!allData) {
        return new HttpException(
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
        return new HttpException(
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
        return new HttpException(
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
      return new HttpException(
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
      return new HttpException(
        `El colaborador con número de identificación ${idNumber} no esta registrado en la base de datos de la clínica.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return data;
  }

  async createUserCollaborator(userCollaborator: CreateUserDto) {
    const data = await this.searchCollaborator({
      idType: userCollaborator.user_id_type,
      idNumber: userCollaborator.id_number,
    });

    const collaboratorData = data[0]?.data?.[0];

    const idTypeNumber: number = data[1]?.idTypeIdNumber;
    const genderTypeIdNumber: number = data[1]?.genderTypeIdNumber;

    if (!collaboratorData) {
      return new HttpException(
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
      return new HttpException(
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
      return new HttpException(
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
      return new HttpException(
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
      return new HttpException(
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
      return new HttpException(
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
      return new HttpException(
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

    await this.userRepository.save(userCollaboratorSave);

    const userCollaboratorCreated = await this.userRepository.findOne({
      where: { id: userCollaboratorSave.id },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    return userCollaboratorCreated;
  }

  // GET FUNTIONS //

  async getAllUsers() {
    const allUsers = await this.userRepository.find({
      where: {
        is_active: true,
      },
      order: {
        createdAt: 'ASC',
      },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    if (!allUsers.length) {
      return new HttpException(
        `No hay usuarios registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allUsers;
    }
  }

  async getUserById(id: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id,
        is_active: true,
      },
    });

    if (!userFound) {
      return new HttpException(
        `El usuario con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return userFound;
    }
  }

  async getUserByIdNumberAndRole(idNumber: number, userRoles: RolesEnum[]) {
    const userFound = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where('user.id_number = :idNumber', { idNumber })
      .andWhere('role.name IN (:...roles)', { roles: userRoles })
      .andWhere('user.is_active = :isActive', { isActive: true })
      .getOne();

    if (!userFound) {
      throw new HttpException(
        `No se encontró ningún usuario activo con el número de identificación: ${idNumber} y roles proporcionados.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return userFound;
  }

  async getUserActiveByTypeAndIdNumber(idType: number, idNumber: number) {
    return await this.userRepository.findOneBy({
      user_id_type: idType,
      id_number: idNumber,
      is_active: true,
    });
  }

  async getUserFoundByIdNumberWithPassword(
    userIdType: number,
    idNumber: number,
  ) {
    return await this.userRepository.findOne({
      where: { user_id_type: userIdType, id_number: idNumber, is_active: true },
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
    });
  }

  async getUserActiveByIdAndCode(idNumber: number, verificationCode: number) {
    return await this.userRepository.findOneBy({
      id_number: idNumber,
      verification_code: verificationCode,
      is_active: true,
    });
  }

  async getUserRoles(
    id: string,
  ): Promise<{ assignedRoles: Role[]; unassignedRoles: Role[] }> {
    const userFound = await this.userRepository.findOne({
      where: { id, is_active: true },
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    const allRoles = await this.roleRepository.find();

    const assignedRoles = userFound.role;

    const unassignedRoles = allRoles.filter(
      (role) => !assignedRoles.some((assigned) => assigned.id === role.id),
    );

    return {
      assignedRoles,
      unassignedRoles,
    };
  }

  // UPDATE FUNTIONS //

  async updateUser(id: string, updateUser: UpdateUserDto) {
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

    const principalEmailUserValidate = await this.userRepository.findOne({
      where: {
        id: Not(userFound.id),
        principal_email: updateUser.principal_email,
      },
    });

    if (updateUser.principal_email && principalEmailUserValidate) {
      return new HttpException(
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
      return new HttpException(
        `El correo electrónico ${updateUser.personal_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const personalCellphoneUserValidate = await this.userRepository.findOne({
      where: {
        id: Not(userFound.id),
        personal_cellphone: updateUser.personal_cellphone,
      },
    });

    if (updateUser.personal_cellphone && personalCellphoneUserValidate) {
      return new HttpException(
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
      return new HttpException(
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
      return new HttpException(
        `Nivel de cargo no encontrado en base de datos.`,
        HttpStatus.CONFLICT,
      );
    }

    const { roleIdsToAdd, roleIdsToRemove, ...userUpdates } = updateUser;

    const userUpdate = await this.userRepository.update(id, userUpdates);

    if (roleIdsToAdd || roleIdsToRemove) {
      await this.updateUserRoles(id, roleIdsToAdd, roleIdsToRemove);
    }

    if (userUpdate.affected === 0) {
      return new HttpException(`Usuario no encontrado`, HttpStatus.NOT_FOUND);
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async updateUserRoles(
    id: string,
    roleIdsToAdd: number[],
    roleIdsToRemove: number[],
  ) {
    const userFound = await this.userRepository.findOne({
      where: { id, is_active: true },
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    if (roleIdsToAdd && roleIdsToAdd.length > 0) {
      const rolesToAdd = await this.roleRepository.findBy({
        id: In(roleIdsToAdd),
      });

      userFound.role = [
        ...userFound.role,
        ...rolesToAdd.filter(
          (role) =>
            !userFound.role.some((existingRole) => existingRole.id === role.id),
        ),
      ];
    }

    if (roleIdsToRemove && roleIdsToRemove.length > 0) {
      userFound.role = userFound.role.filter(
        (role) => !roleIdsToRemove.includes(role.id),
      );

      if (userFound.role.length === 0) {
        throw new HttpException(
          `El usuario debe tener al menos un rol asignado.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.userRepository.save(userFound);

    return new HttpException(
      `Roles actualizados correctamente.`,
      HttpStatus.ACCEPTED,
    );
  }

  async updateUserPassword() {}

  async forgotUserPassword() {}

  async resetUserPassword() {}

  // DELETED-BAN FUNTIONS //

  async banUsers() {}
}
