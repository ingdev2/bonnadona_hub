import { Module } from '@nestjs/common';
import { ApplicationModuleService } from './services/application_module.service';
import { ApplicationModuleController } from './controllers/application_module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './entities/application_module.entity';
import { Application } from 'src/application/entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationModule, Application])],
  controllers: [ApplicationModuleController],
  providers: [ApplicationModuleService],
})
export class ApplicationModuleModule {}
