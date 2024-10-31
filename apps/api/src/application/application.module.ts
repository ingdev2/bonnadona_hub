import { Module } from '@nestjs/common';
import { ApplicationService } from './services/application.service';
import { ApplicationController } from './controllers/application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
