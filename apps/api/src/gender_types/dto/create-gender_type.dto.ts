import { IsEnum, IsNotEmpty } from 'class-validator';
import { GenderTypeEnums } from 'src/utils/enums/user/gender_types.enum';

export class CreateGenderTypeDto {
  @IsNotEmpty()
  @IsEnum(GenderTypeEnums)
  name: GenderTypeEnums;
}
