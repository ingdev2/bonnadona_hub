import { forwardRef, Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from './entities/permissions.entity';
import { User } from 'src/user/entities/user.entity';
import { Application } from 'src/application/entities/application.entity';
import { ApplicationModule } from 'src/application_module/entities/application_module.entity';
import { ModuleAction } from 'src/module_action/entities/module_action.entity';
import { UsersModule } from 'src/user/users.module';
import { AuditLogsModule } from 'src/audit_logs/audit_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Permissions,
      User,
      Application,
      ApplicationModule,
      ModuleAction,
    ]),
    forwardRef(() => UsersModule),
    AuditLogsModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
