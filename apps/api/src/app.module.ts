import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

require('dotenv').config();

import { UsersModule } from './user/users.module';
import { IdTypesModule } from './id_types/id_types.module';
import { GenderTypesModule } from './gender_types/gender_types.module';
import { BloodGroupsModule } from './blood_groups/blood_groups.module';
import { RoleModule } from './role/role.module';
import { UserProfileModule } from './user_profile/user_profile.module';
import { ServiceTypesModule } from './service_types/service_types.module';
import { PositionLevelModule } from './position_levels/position_level.module';
import { AuthModule } from './auth/auth.module';
import { UserSessionLogModule } from './user_session_log/user_session_log.module';
import { PasswordPolicyModule } from './password_policy/password_policy.module';
import { PasswordHistoryModule } from './password_history/password_history.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ApplicationModule } from './application/application.module';
import { ApplicationModuleModule } from './application_module/application_module.module';
import { ModuleActionModule } from './module_action/module_action.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),
    UsersModule,
    IdTypesModule,
    GenderTypesModule,
    BloodGroupsModule,
    RoleModule,
    UserProfileModule,
    ServiceTypesModule,
    PositionLevelModule,
    AuthModule,
    UserSessionLogModule,
    PasswordPolicyModule,
    PasswordHistoryModule,
    PermissionsModule,
    AppModule,
    ApplicationModule,
    ApplicationModuleModule,
    ModuleActionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
