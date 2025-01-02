import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Req,
} from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Permissions } from '../entities/permissions.entity';
import { Application } from 'src/application/entities/application.entity';
import { ApplicationModule } from 'src/application_module/entities/application_module.entity';
import { ModuleAction } from 'src/module_action/entities/module_action.entity';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/services/users.service';
import { AuditLogsService } from 'src/audit_logs/services/audit_logs.service';

import { ActionTypesEnum } from 'src/utils/enums/audit_logs_enums/action_types.enum';
import { QueryTypesEnum } from 'src/utils/enums/audit_logs_enums/query_types.enum';
import { ModuleNameEnum } from 'src/utils/enums/audit_logs_enums/module_names.enum';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepo: Repository<Permissions>,

    @InjectRepository(Application)
    private applicationRepo: Repository<Application>,

    @InjectRepository(ApplicationModule)
    private moduleRepo: Repository<ApplicationModule>,

    @InjectRepository(ModuleAction)
    private actionRepo: Repository<ModuleAction>,

    @InjectRepository(User) private userRepo: Repository<User>,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly auditLogService: AuditLogsService,
  ) {}

  // CREATE FUNTIONS //

  async createPermission(
    permissionDto: CreatePermissionDto,
    @Req() requestAuditLog: any,
  ) {
    const {
      applications: app_ids,
      application_modules: app_module_ids,
      module_actions: module_action_ids,
    } = permissionDto;

    const permissionFound = await this.permissionRepo.findOne({
      where: { name: permissionDto.name },
    });

    if (permissionFound) {
      throw new HttpException(
        `El permiso que deseas crear ya existe para el cargo ingresado`,
        HttpStatus.CONFLICT,
      );
    }

    // const positions = await this.usersService.getAllColaboratorPositions();

    // if (!positions.includes(permissionDto.name)) {
    //   throw new HttpException(
    //     `El nombre del permiso debe coincidir con uno de los cargos registrados.`,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const apps = await this.applicationRepo.findBy({ id: In(app_ids) });

    if (apps.length !== app_ids.length) {
      throw new HttpException(
        `Una o más aplicaciones no existen.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const modules = await this.moduleRepo.findBy({ id: In(app_module_ids) });

    if (modules.length !== app_module_ids.length) {
      throw new HttpException(
        `Uno o más módulos no existen.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const actions = await this.actionRepo.findBy({ id: In(module_action_ids) });

    if (actions.length !== module_action_ids.length) {
      throw new HttpException(
        `Una o más acciones no existen.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const permission = this.permissionRepo.create({
      ...permissionDto,
      applications: apps,
      application_modules: modules,
      module_actions: actions,
    });

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.CREATE_PERMISSION,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.PERMISSIONS_MODULE,
      module_record_id: permission.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return await this.permissionRepo.save(permission);
  }

  async assignDefaultPermissionsToUser(
    user: User,
    collaboratorPosition: string,
  ) {
    let positionPermissions = await this.permissionRepo.find({
      where: { name: collaboratorPosition },
    });

    if (!positionPermissions.length) {
      const defaultPermission = this.permissionRepo.create({
        name: collaboratorPosition,
        description: `PERMISO POR DEFECTO PARA EL CARGO: ${collaboratorPosition}`,
        applications: [],
        application_modules: [],
        module_actions: [],
      });

      positionPermissions = [await this.permissionRepo.save(defaultPermission)];
    }

    user.permission = [...positionPermissions];

    return await this.userRepo.save(user);
  }

  // GET FUNTIONS //

  async getAllPermissions() {
    const allPermissions = await this.permissionRepo.find({
      order: {
        name: 'ASC',
      },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    if (!allPermissions.length) {
      throw new HttpException(
        `No hay permisos registrados en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return allPermissions;
    }
  }

  async getPermission(permissionid: string) {
    const permissionFound = await this.permissionRepo.findOne({
      where: { id: permissionid },
      loadEagerRelations: false,
      loadRelationIds: true,
    });

    if (!permissionFound) {
      throw new HttpException(`Permiso no encontrado`, HttpStatus.CONFLICT);
    } else {
      return permissionFound;
    }
  }

  // UPDATE FUNTIONS //

  async modifyPermission(
    permissionId: string,
    updatePermission: UpdatePermissionDto,
    @Req() requestAuditLog: any,
  ) {
    const permission = await this.permissionRepo.findOne({
      where: { id: permissionId },
    });

    if (!permission) {
      throw new HttpException(`Permiso no encontrado`, HttpStatus.NOT_FOUND);
    }

    if (updatePermission.name) {
      const duplicatePermission = await this.permissionRepo.findOne({
        where: {
          id: Not(permissionId),
          name: permission.name,
        },
      });

      if (duplicatePermission) {
        throw new HttpException(`Permiso duplicado.`, HttpStatus.CONFLICT);
      }
    }

    if (updatePermission.description) {
      permission.description = updatePermission.description;
    }

    if (updatePermission.applications) {
      const apps = await this.applicationRepo.findBy({
        id: In(updatePermission.applications),
      });

      if (apps.length !== updatePermission.applications.length) {
        throw new HttpException(
          `Una o más aplicaciones no existen`,
          HttpStatus.NOT_FOUND,
        );
      }

      permission.applications = apps;
    }

    if (updatePermission.application_modules) {
      const modules = await this.moduleRepo.findBy({
        id: In(updatePermission.application_modules),
      });

      if (modules.length !== updatePermission.application_modules.length) {
        throw new HttpException(
          `Uno o más módulos no existen`,
          HttpStatus.NOT_FOUND,
        );
      }

      permission.application_modules = modules;
    }

    if (updatePermission.module_actions) {
      const actions = await this.actionRepo.findBy({
        id: In(updatePermission.module_actions),
      });

      if (actions.length !== updatePermission.module_actions.length) {
        throw new HttpException(
          `Una o más acciones no existen`,
          HttpStatus.NOT_FOUND,
        );
      }

      permission.module_actions = actions;
    }

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.PERMISSION_UPDATE,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.PERMISSIONS_MODULE,
      module_record_id: permissionId,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return await this.permissionRepo.save(permission);
  }
}
