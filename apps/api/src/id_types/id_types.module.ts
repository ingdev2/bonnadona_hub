import { Module } from '@nestjs/common';
import { IdTypesService } from './services/id_types.service';
import { IdTypesController } from './controllers/id_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdType } from './entities/id_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdType])],
  controllers: [IdTypesController],
  providers: [IdTypesService],
})
export class IdTypesModule {}
