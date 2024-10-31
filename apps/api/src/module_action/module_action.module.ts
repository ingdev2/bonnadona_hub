import { Module } from '@nestjs/common';
import { ModuleActionService } from './services/module_action.service';
import { ModuleActionController } from './controllers/module_action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleAction } from './entities/module_action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleAction])],
  controllers: [ModuleActionController],
  providers: [ModuleActionService],
})
export class ModuleActionModule {}
