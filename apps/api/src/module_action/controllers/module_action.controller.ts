import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleActionService } from '../services/module_action.service';
import { CreateModuleActionDto } from '../dto/create-module_action.dto';
import { UpdateModuleActionDto } from '../dto/update-module_action.dto';

@Controller('module-action')
export class ModuleActionController {
  constructor(private readonly moduleActionService: ModuleActionService) {}

  @Post()
  create(@Body() createModuleActionDto: CreateModuleActionDto) {
    return this.moduleActionService.create(createModuleActionDto);
  }

  @Get()
  findAll() {
    return this.moduleActionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleActionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleActionDto: UpdateModuleActionDto,
  ) {
    return this.moduleActionService.update(+id, updateModuleActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleActionService.remove(+id);
  }
}
