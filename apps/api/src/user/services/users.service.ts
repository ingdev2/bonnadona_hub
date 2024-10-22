import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IdTypeEnum } from 'src/utils/enums/id_types.enum';
import { IdType } from 'src/id_types/entities/id_type.entity';
import { IdTypeAbbrev } from 'src/utils/enums/id_types_abbrev.enum';
import { GenderTypeEnums } from 'src/utils/enums/gender_types.enum';
import { GenderTypeAbbrev } from 'src/utils/enums/gender_types_abbrev.enum';
import { ValidateCollaboratorDto } from '../dto/validate_collaborator.dto';

import axios from 'axios';
import { GenderType } from 'src/gender_types/entities/gender_type.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(IdType)
    private idTypeRepository: Repository<IdType>,

    @InjectRepository(GenderType)
    private genderRepository: Repository<GenderType>,
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

      const allData = response.data;

      // TRANSFORMAR DATOS DE TIPOS DE IDENTIFICACIÓN

      const idTypeAbbrev = allData?.data[0]?.empDocType;

      const idTypeAbbreviations: Record<IdTypeAbbrev, IdTypeEnum> = {
        [IdTypeAbbrev.CÉDULA_DE_CIUDADANÍA]: IdTypeEnum.CITIZENSHIP_CARD,
        [IdTypeAbbrev.CÉDULA_DE_EXTRANJERÍA]: IdTypeEnum.FOREIGNER_ID,
        [IdTypeAbbrev.TARJETA_DE_IDENTIDAD]: IdTypeEnum.IDENTITY_CARD,
        [IdTypeAbbrev.REGISTRO_CIVIL]: IdTypeEnum.CIVIL_REGISTRATION,
        [IdTypeAbbrev.PASAPORTE]: IdTypeEnum.PASSPORT,
        [IdTypeAbbrev.PERMISO_ESPECIAL_PERMANENCIA]:
          IdTypeEnum.SPECIAL_RESIDENCE_PERMIT,
        [IdTypeAbbrev.PERMISO_PROTECCIÓN_TEMPORAL]:
          IdTypeEnum.TEMPORARY_PROTECTION_PERMIT,
        [IdTypeAbbrev.MENOR_SIN_IDENTIFICACIÓN]:
          IdTypeEnum.MINOR_WITHOUT_IDENTIFICATION,
        [IdTypeAbbrev.MAYOR_SIN_IDENTIFICACIÓN]:
          IdTypeEnum.ADULT_WITHOUT_IDENTIFICATION,
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

  async createUser() {}

  // GET FUNTIONS //

  async getAllUsers() {}

  async getUsersById() {}

  // UPDATE FUNTIONS //

  async updateUser() {}

  async updateUserPassword() {}

  async forgotUserPassword() {}

  async resetUserPassword() {}

  // DELETED-BAN FUNTIONS //

  async banUsers() {}
}
