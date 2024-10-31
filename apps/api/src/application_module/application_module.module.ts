import { Module } from '@nestjs/common';
import { ApplicationModuleService } from './services/application_module.service';
import { ApplicationModuleController } from './controllers/application_module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './entities/application_module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationModule])],
  controllers: [ApplicationModuleController],
  providers: [ApplicationModuleService],
})
export class ApplicationModuleModule {}
