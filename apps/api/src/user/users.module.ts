import { User } from './entities/user.entity';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/user_profile/entities/user_profile.entity';
import { UserSessionLog } from 'src/user_session_log/entities/user_session_log.entity';
import { Role } from 'src/role/entities/role.entity';
import { IdType } from 'src/id_types/entities/id_type.entity';
import { GenderType } from 'src/gender_types/entities/gender_type.entity';
import { BloodGroup } from 'src/blood_groups/entities/blood_group.entity';
import { ServiceType } from 'src/service_types/entities/service_type.entity';
import { PositionLevel } from 'src/position_levels/entities/position_level.entity';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { AuditLogsModule } from 'src/audit_logs/audit_logs.module';
import { PasswordPolicyModule } from 'src/password_policy/password_policy.module';
import { PasswordPolicy } from 'src/password_policy/entities/password_policy.entity';
import { PasswordHistoryModule } from 'src/password_history/password_history.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { Permissions } from 'src/permissions/entities/permissions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserProfile,
      UserSessionLog,
      Role,
      Permissions,
      IdType,
      GenderType,
      BloodGroup,
      ServiceType,
      PositionLevel,
      PasswordPolicy,
    ]),
    forwardRef(() => PermissionsModule),
    PasswordPolicyModule,
    PasswordHistoryModule,
    NodemailerModule,
    AuditLogsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
