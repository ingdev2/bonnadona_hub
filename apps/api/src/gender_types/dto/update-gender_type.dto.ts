import { PartialType } from '@nestjs/swagger';
import { CreateGenderTypeDto } from './create-gender_type.dto';

export class UpdateGenderTypeDto extends PartialType(CreateGenderTypeDto) {}
