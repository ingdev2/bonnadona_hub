import { IsEnum, IsNotEmpty } from 'class-validator';
import { IdType } from 'src/utils/enums/id_types.enum';

export class CreateIdTypeDto {
  @IsNotEmpty()
  @IsEnum(IdType)
  name: IdType;
}