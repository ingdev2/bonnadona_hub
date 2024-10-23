import { IsEnum, IsNotEmpty } from 'class-validator';
import { BloodGroupEnums } from '../enums/blood_group.enum';

export class CreateBloodGroupDto {
  @IsNotEmpty()
  @IsEnum(BloodGroupEnums)
  name: BloodGroupEnums;
}
