import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApplicationsEnum } from 'src/utils/enums/applications/applications.enum';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsEnum(ApplicationsEnum)
  name: ApplicationsEnum;
}
