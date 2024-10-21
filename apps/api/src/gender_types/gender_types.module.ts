import { Module } from '@nestjs/common';
import { GenderTypesService } from './services/gender_types.service';
import { GenderTypesController } from './controllers/gender_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderType } from './entities/gender_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenderType])],
  controllers: [GenderTypesController],
  providers: [GenderTypesService],
})
export class GenderTypesModule {}
