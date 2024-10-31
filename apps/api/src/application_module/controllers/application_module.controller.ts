import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApplicationModuleService } from '../services/application_module.service';
import { CreateApplicationModuleDto } from '../dto/create-application_module.dto';
import { UpdateApplicationModuleDto } from '../dto/update-application_module.dto';

@Controller('application-module')
export class ApplicationModuleController {
  constructor(
    private readonly applicationModuleService: ApplicationModuleService,
  ) {}

  @Post()
  create(@Body() createApplicationModuleDto: CreateApplicationModuleDto) {
    return this.applicationModuleService.create(createApplicationModuleDto);
  }

  @Get()
  findAll() {
    return this.applicationModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationModuleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationModuleDto: UpdateApplicationModuleDto,
  ) {
    return this.applicationModuleService.update(
      +id,
      updateApplicationModuleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationModuleService.remove(+id);
  }
}
