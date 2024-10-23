import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/user_profile/entities/user_profile.entity';
import { Role } from 'src/role/entities/role.entity';
import { IdType } from 'src/id_types/entities/id_type.entity';
import { GenderType } from 'src/gender_types/entities/gender_type.entity';
import { ServiceType } from 'src/service_types/entities/service_type.entity';
import { PositionLevel } from 'src/position_levels/entities/position_level.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserProfile,
      Role,
      IdType,
      GenderType,
      ServiceType,
      PositionLevel,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
