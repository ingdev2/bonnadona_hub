import { IsEnum, IsNotEmpty } from 'class-validator';
import { GenderTypeEnums } from 'src/utils/enums/gender_types.enum';

export class CreateGenderTypeDto {
  @IsNotEmpty()
  @IsEnum(GenderTypeEnums)
  name: GenderTypeEnums;
}
