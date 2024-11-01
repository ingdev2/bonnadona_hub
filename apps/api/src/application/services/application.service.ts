import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  // CREATE FUNTIONS //

  async createApplication(application: CreateApplicationDto) {
    const applicationFound = await this.applicationRepository.findOne({
      where: {
        name: application.name,
      },
    });

    if (applicationFound) {
      throw new HttpException(
        `La aplicacion: ${application.name} ya está registrada.`,
        HttpStatus.CONFLICT,
      );
    }

    const newApplication = await this.applicationRepository.create(application);

    return await this.applicationRepository.save(newApplication);
  }

  // GET FUNTIONS //

  async getAllApplications() {
    const allApplications = await this.applicationRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allApplications.length === 0) {
      throw new HttpException(
        `No hay aplicaciones registradas en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allApplications;
    }
  }

  async getApplicationById(id: number) {
    const applicationFound = await this.applicationRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!applicationFound) {
      throw new HttpException(
        `La aplicacion con número de ID: ${id} no esta registrada.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return applicationFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateApplication(id: number, application: UpdateApplicationDto) {
    const applicationFound = await this.applicationRepository.findOneBy({ id });

    if (!applicationFound) {
      throw new HttpException(
        `Aplicacion no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (application.name) {
      const duplicateApplication = await this.applicationRepository.findOne({
        where: {
          name: application.name,
        },
      });

      if (duplicateApplication) {
        throw new HttpException(`Aplicacion duplicada.`, HttpStatus.CONFLICT);
      }
    }

    const updateApplication = await this.applicationRepository.update(
      id,
      application,
    );

    if (updateApplication.affected === 0) {
      throw new HttpException(
        `Aplicacion no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
