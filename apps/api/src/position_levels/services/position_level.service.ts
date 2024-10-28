import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePositionLevelDto } from '../dto/create-position_level.dto';
import { UpdatePositionLevelDto } from '../dto/update-position_level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PositionLevel } from '../entities/position_level.entity';

@Injectable()
export class PositionLevelService {
  constructor(
    @InjectRepository(PositionLevel)
    private positionLevelRepository: Repository<PositionLevel>,
  ) {}

  // CREATE FUNTIONS //

  async createPositionLevel(positionLevel: CreatePositionLevelDto) {
    const positionLevelFound = await this.positionLevelRepository.findOne({
      where: {
        name: positionLevel.name,
      },
    });

    if (positionLevelFound) {
      throw new HttpException(
        `El nivel de cargo: ${positionLevel.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newPositionLevel =
      await this.positionLevelRepository.create(positionLevel);

    return await this.positionLevelRepository.save(newPositionLevel);
  }

  // GET FUNTIONS //

  async getAllPositionLevels() {
    const allPositionLevels = await this.positionLevelRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allPositionLevels.length === 0) {
      throw new HttpException(
        `No hay niveles de cargo registrados en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allPositionLevels;
    }
  }

  async getPositionLevelById(id: number) {
    const positionLevelFound = await this.positionLevelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!positionLevelFound) {
      throw new HttpException(
        `El nivel de cargo con número de ID: ${id} no esta registrado.`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return positionLevelFound;
    }
  }

  // UPDATE FUNTIONS //

  async updatePositionLevel(id: number, positionLevel: UpdatePositionLevelDto) {
    const positionLevelFound = await this.positionLevelRepository.findOneBy({
      id,
    });

    if (!positionLevelFound) {
      throw new HttpException(
        `Nivel de cargo no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (positionLevel.name) {
      const duplicatePositionLevel = await this.positionLevelRepository.findOne(
        {
          where: {
            name: positionLevel.name,
          },
        },
      );

      if (duplicatePositionLevel) {
        throw new HttpException(
          `Nivel de cargo duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updatePositionLevel = await this.positionLevelRepository.update(
      id,
      positionLevel,
    );

    if (updatePositionLevel.affected === 0) {
      throw new HttpException(
        `Nivel de cargo no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
