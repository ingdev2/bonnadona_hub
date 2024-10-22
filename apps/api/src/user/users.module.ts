import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdType } from 'src/id_types/entities/id_type.entity';
import { GenderType } from 'src/gender_types/entities/gender_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, IdType, GenderType])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
