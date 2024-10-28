import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIdTypeDto } from '../dto/create-id_type.dto';
import { UpdateIdTypeDto } from '../dto/update-id_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdType } from '../entities/id_type.entity';

@Injectable()
export class IdTypesService {
  constructor(
    @InjectRepository(IdType)
    private idTypeRepository: Repository<IdType>,
  ) {}

  // CREATE FUNTIONS //

  async createIdType(idType: CreateIdTypeDto) {
    const idTypeFound = await this.idTypeRepository.findOne({
      where: {
        name: idType.name,
      },
    });

    if (idTypeFound) {
      throw new HttpException(
        `El tipo de id: ${idType.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newIdType = await this.idTypeRepository.create(idType);

    return await this.idTypeRepository.save(newIdType);
  }

  // GET FUNTIONS //

  async getAllIdTypes() {
    const allIdTypes = await this.idTypeRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allIdTypes.length === 0) {
      throw new HttpException(
        `No hay tipos de id registrados en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allIdTypes;
    }
  }

  async getIdTypeById(id: number) {
    const idTypeFound = await this.idTypeRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!idTypeFound) {
      throw new HttpException(
        `El tipo de identificación con número de ID: ${id} no esta registrado.`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return idTypeFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateIdType(id: number, idType: UpdateIdTypeDto) {
    const idTypeFound = await this.idTypeRepository.findOneBy({ id });

    if (!idTypeFound) {
      throw new HttpException(
        `Tipo de id no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (idType.name) {
      const duplicateIdType = await this.idTypeRepository.findOne({
        where: {
          name: idType.name,
        },
      });

      if (duplicateIdType) {
        throw new HttpException(`Tipo de id duplicado.`, HttpStatus.CONFLICT);
      }
    }

    const updateIdType = await this.idTypeRepository.update(id, idType);

    if (updateIdType.affected === 0) {
      throw new HttpException(
        `Tipo de id no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
