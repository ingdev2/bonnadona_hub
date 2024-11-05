import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationModuleDto } from '../dto/create-application_module.dto';
import { UpdateApplicationModuleDto } from '../dto/update-application_module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationModule } from '../entities/application_module.entity';
import { Application } from 'src/application/entities/application.entity';

@Injectable()
export class ApplicationModuleService {
  constructor(
    @InjectRepository(ApplicationModule)
    private appModuleRepository: Repository<ApplicationModule>,

    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  // CREATE FUNTIONS //

  async createAppModule(appModule: CreateApplicationModuleDto) {
    const appModuleFound = await this.appModuleRepository.findOne({
      where: {
        app_id: appModule.app_id,
        name: appModule.name,
      },
    });

    if (appModuleFound) {
      throw new HttpException(
        `El módulo de aplicacion: ${appModule.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const application = await this.applicationRepository.findOne({
      where: { id: appModule.app_id },
    });

    if (!application) {
      throw new HttpException(
        `La aplicacion con ID: ${appModule.app_id} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const newAppModule = await this.appModuleRepository.create({
      ...appModule,
      application: application,
    });

    return await this.appModuleRepository.save(newAppModule);
  }

  // GET FUNTIONS //

  async getAllAppModules() {
    const allAppModules = await this.appModuleRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allAppModules.length === 0) {
      throw new HttpException(
        `No hay módulos de aplicaciones registrados en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allAppModules;
    }
  }

  async getAppModuleById(id: number) {
    const appModuleFound = await this.appModuleRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!appModuleFound) {
      throw new HttpException(
        `El módulo de aplicacion con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return appModuleFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateAppModule(id: number, appModule: UpdateApplicationModuleDto) {
    const appModuleFound = await this.appModuleRepository.findOneBy({ id });

    if (!appModuleFound) {
      throw new HttpException(
        `Módulo de aplicacion no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (appModule.name) {
      const duplicateAppModule = await this.appModuleRepository.findOne({
        where: {
          name: appModule.name,
        },
      });

      if (duplicateAppModule) {
        throw new HttpException(
          `Módulo de aplicacion duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateApplication = await this.appModuleRepository.update(
      id,
      appModule,
    );

    if (updateApplication.affected === 0) {
      throw new HttpException(
        `Módulo de aplicacion no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
