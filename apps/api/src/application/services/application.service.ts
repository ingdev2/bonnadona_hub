import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { AuditLogsService } from 'src/audit_logs/services/audit_logs.service';

import { ActionTypesEnum } from 'src/utils/enums/audit_logs_enums/action_types.enum';
import { QueryTypesEnum } from 'src/utils/enums/audit_logs_enums/query_types.enum';
import { ModuleNameEnum } from 'src/utils/enums/audit_logs_enums/module_names.enum';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,

    private readonly auditLogService: AuditLogsService,
  ) {}

  // CREATE FUNTIONS //

  async createApplication(
    application: CreateApplicationDto,
    requestAuditLog: any,
  ) {
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

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.CREATE_APP,
      query_type: QueryTypesEnum.POST,
      module_name: ModuleNameEnum.APP_MODULE,
      module_record_id: newApplication.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return await this.applicationRepository.save(newApplication);
  }

  // GET FUNTIONS //

  async getAllApplications() {
    const allApplications = await this.applicationRepository.find({
      order: {
        name: 'ASC',
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

  async getAllActiveApplications() {
    const allApplications = await this.applicationRepository.find({
      where: {
        is_active: true,
      },
      order: {
        name: 'ASC',
      },
    });

    if (allApplications.length === 0) {
      throw new HttpException(
        `No hay aplicaciones activas registradas en la base de datos`,
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

  async updateApplication(
    id: number,
    application: UpdateApplicationDto,
    requestAuditLog: any,
  ) {
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
          id: Not(id),
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

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.UPDATE_APP,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.APP_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async banApplication(id: number, @Req() requestAuditLog: any) {
    const applicationFound = await this.applicationRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!applicationFound) {
      return new HttpException(
        `La aplicación con número de ID: ${id} no esta registrada.`,
        HttpStatus.CONFLICT,
      );
    }

    applicationFound.is_active = !applicationFound.is_active;

    await this.applicationRepository.save(applicationFound);

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type:
        applicationFound.is_active === false
          ? ActionTypesEnum.BAN_APP
          : ActionTypesEnum.UNBAN_APP,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.APP_MODULE,
      module_record_id: applicationFound.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    const statusMessage = applicationFound.is_active
      ? `La aplicación con número de ID: ${applicationFound.id} se ha ACTIVADO.`
      : `La aplicación con número de ID: ${applicationFound.id} se ha INACTIVADO.`;

    throw new HttpException(statusMessage, HttpStatus.ACCEPTED);
  }
}
