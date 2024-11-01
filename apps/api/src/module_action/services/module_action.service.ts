import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModuleActionDto } from '../dto/create-module_action.dto';
import { UpdateModuleActionDto } from '../dto/update-module_action.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleAction } from '../entities/module_action.entity';
import { ApplicationModule } from 'src/application_module/entities/application_module.entity';

@Injectable()
export class ModuleActionService {
  constructor(
    @InjectRepository(ModuleAction)
    private moduleActionRepository: Repository<ModuleAction>,

    @InjectRepository(ApplicationModule)
    private appModuleRepository: Repository<ApplicationModule>,
  ) {}

  // CREATE FUNTIONS //

  async createModuleAction(moduleAction: CreateModuleActionDto) {
    const moduleActionFound = await this.moduleActionRepository.findOne({
      where: {
        app_module_id: moduleAction.app_module_id,
        name: moduleAction.name,
      },
    });

    if (moduleActionFound) {
      throw new HttpException(
        `La acción de módulo: ${moduleAction.name} ya está registrada.`,
        HttpStatus.CONFLICT,
      );
    }

    const appModule = await this.appModuleRepository.findOne({
      where: { id: moduleAction.app_module_id },
    });

    if (!appModule) {
      throw new HttpException(
        `El módulo de aplicacion con ID: ${moduleAction.app_module_id} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const newModuleAction = await this.moduleActionRepository.create({
      ...moduleAction,
      application_module: appModule,
    });

    return await this.moduleActionRepository.save(newModuleAction);
  }

  // GET FUNTIONS //

  async getAllModuleActions() {
    const allModuleActions = await this.moduleActionRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allModuleActions.length === 0) {
      throw new HttpException(
        `No hay acciones de módulos registradas en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allModuleActions;
    }
  }

  async getModuleActionById(id: number) {
    const moduleActionFound = await this.moduleActionRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!moduleActionFound) {
      throw new HttpException(
        `La acción de módulo con número de ID: ${id} no esta registrada.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return moduleActionFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateModuleAction(id: number, moduleAction: UpdateModuleActionDto) {
    const moduleActionFound = await this.moduleActionRepository.findOneBy({
      id,
    });

    if (!moduleActionFound) {
      throw new HttpException(
        `Acción de módulo no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (moduleAction.name) {
      const duplicateModuleAction = await this.moduleActionRepository.findOne({
        where: {
          name: moduleAction.name,
        },
      });

      if (duplicateModuleAction) {
        throw new HttpException(
          `Acción de módulo duplicada.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateModuleAction = await this.moduleActionRepository.update(
      id,
      moduleAction,
    );

    if (updateModuleAction.affected === 0) {
      throw new HttpException(
        `Acción de módulo no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
