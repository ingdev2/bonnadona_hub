import { IsEnum, IsNotEmpty } from 'class-validator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(RolesEnum)
  name: RolesEnum;
}
