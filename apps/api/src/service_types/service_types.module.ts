import { Module } from '@nestjs/common';
import { ServiceTypesService } from './services/service_types.service';
import { ServiceTypesController } from './controllers/service_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceType } from './entities/service_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceType])],
  controllers: [ServiceTypesController],
  providers: [ServiceTypesService],
})
export class ServiceTypesModule {}
