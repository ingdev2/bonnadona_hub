import { IsEnum, IsNotEmpty } from 'class-validator';
import { IdTypeEnum } from 'src/utils/enums/user/id_types.enum';

export class CreateIdTypeDto {
  @IsNotEmpty()
  @IsEnum(IdTypeEnum)
  name: IdTypeEnum;
}
