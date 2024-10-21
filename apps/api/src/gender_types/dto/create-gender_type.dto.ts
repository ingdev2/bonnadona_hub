import { IsEnum, IsNotEmpty } from 'class-validator';
import { GenderTypeEnums } from 'src/utils/enums/gender.enum';

export class CreateGenderTypeDto {
  @IsNotEmpty()
  @IsEnum(GenderTypeEnums)
  name: GenderTypeEnums;
}
