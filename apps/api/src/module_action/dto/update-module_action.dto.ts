import { PartialType } from '@nestjs/swagger';
import { CreateModuleActionDto } from './create-module_action.dto';

export class UpdateModuleActionDto extends PartialType(CreateModuleActionDto) {}
