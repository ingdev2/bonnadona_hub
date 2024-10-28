import { IsEnum, IsNotEmpty } from 'class-validator';
import { IdTypeEnum } from 'src/utils/enums/id_types.enum';

export class CreateIdTypeDto {
  @IsNotEmpty()
  @IsEnum(IdTypeEnum)
  name: IdTypeEnum;
}
