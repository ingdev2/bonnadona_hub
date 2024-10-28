import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceTypeDto } from '../dto/create-service_type.dto';
import { UpdateServiceTypeDto } from '../dto/update-service_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceType } from '../entities/service_type.entity';

@Injectable()
export class ServiceTypesService {
  constructor(
    @InjectRepository(ServiceType)
    private serviceTypeRepository: Repository<ServiceType>,
  ) {}

  // CREATE FUNTIONS //

  async createServiceType(serviceType: CreateServiceTypeDto) {
    const serviceTypeFound = await this.serviceTypeRepository.findOne({
      where: {
        name: serviceType.name,
      },
    });

    if (serviceTypeFound) {
      throw new HttpException(
        `El tipo de servicio: ${serviceType.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newServiceType = await this.serviceTypeRepository.create(serviceType);

    return await this.serviceTypeRepository.save(newServiceType);
  }

  // GET FUNTIONS //

  async getAllServiceTypes() {
    const allServiceTypes = await this.serviceTypeRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allServiceTypes.length === 0) {
      throw new HttpException(
        `No hay tipos de servicio registrados en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allServiceTypes;
    }
  }

  async getServiceTypeById(id: number) {
    const serviceTypeFound = await this.serviceTypeRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!serviceTypeFound) {
      throw new HttpException(
        `El tipo de servicio con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return serviceTypeFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateServiceType(id: number, serviceType: UpdateServiceTypeDto) {
    const serviceTypeFound = await this.serviceTypeRepository.findOneBy({ id });

    if (!serviceTypeFound) {
      throw new HttpException(
        `Tipo de servicio no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (serviceType.name) {
      const duplicateServiceType = await this.serviceTypeRepository.findOne({
        where: {
          name: serviceType.name,
        },
      });

      if (duplicateServiceType) {
        throw new HttpException(`Role duplicado.`, HttpStatus.CONFLICT);
      }
    }

    const updateRole = await this.serviceTypeRepository.update(id, serviceType);

    if (updateRole.affected === 0) {
      throw new HttpException(
        `Tipo de servicio no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
