import { PartialType } from '@nestjs/swagger';
import { CreateApplicationModuleDto } from './create-application_module.dto';

export class UpdateApplicationModuleDto extends PartialType(CreateApplicationModuleDto) {}
