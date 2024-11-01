import { IsEnum, IsNotEmpty } from 'class-validator';
import { PositionLevelEnum } from 'src/utils/enums/user/position_level.enum';

export class CreatePositionLevelDto {
  @IsNotEmpty()
  @IsEnum(PositionLevelEnum)
  name: PositionLevelEnum;
}
