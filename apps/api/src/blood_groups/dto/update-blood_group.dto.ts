import { PartialType } from '@nestjs/swagger';
import { CreateBloodGroupDto } from './create-blood_group.dto';

export class UpdateBloodGroupDto extends PartialType(CreateBloodGroupDto) {}
