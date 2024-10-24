import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBloodGroupDto } from '../dto/create-blood_group.dto';
import { UpdateBloodGroupDto } from '../dto/update-blood_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodGroup } from '../entities/blood_group.entity';

@Injectable()
export class BloodGroupsService {
  constructor(
    @InjectRepository(BloodGroup)
    private bloodGroupRepository: Repository<BloodGroup>,
  ) {}

  // CREATE FUNTIONS //

  async createBloodGroup(bloodGroup: CreateBloodGroupDto) {
    const bloodGroupFound = await this.bloodGroupRepository.findOne({
      where: {
        name: bloodGroup.name,
      },
    });

    if (bloodGroupFound) {
      throw new HttpException(
        `El grupo sanguíneo: ${bloodGroup.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newBloodGroup = await this.bloodGroupRepository.create(bloodGroup);

    return await this.bloodGroupRepository.save(newBloodGroup);
  }

  // GET FUNTIONS //

  async getAllBloodGroups() {
    const allBloodGroup = await this.bloodGroupRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allBloodGroup.length === 0) {
      throw new HttpException(
        `No hay grupos sanguíneos registrados en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allBloodGroup;
    }
  }

  async getBloodGroupById(id: number) {
    const bloodGroupFound = await this.bloodGroupRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!bloodGroupFound) {
      throw new HttpException(
        `El grupo sanguíneo con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return bloodGroupFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateBloodGroup(id: number, bloodGroup: UpdateBloodGroupDto) {
    const bloodGroupFound = await this.bloodGroupRepository.findOneBy({ id });

    if (!bloodGroupFound) {
      throw new HttpException(
        `Grupo sanguíneo no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (bloodGroup.name) {
      const duplicateBloodGroup = await this.bloodGroupRepository.findOne({
        where: {
          name: bloodGroup.name,
        },
      });

      if (duplicateBloodGroup) {
        throw new HttpException(
          `Grupo sanguíneo duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateBloodGroup = await this.bloodGroupRepository.update(
      id,
      bloodGroup,
    );

    if (updateBloodGroup.affected === 0) {
      throw new HttpException(
        `Grupo sanguíneo no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
