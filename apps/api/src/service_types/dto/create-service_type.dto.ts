import { IsEnum, IsNotEmpty } from 'class-validator';
import { ServiceTypesEnum } from 'src/utils/enums/service_types.enum';

export class CreateServiceTypeDto {
  @IsNotEmpty()
  @IsEnum(ServiceTypesEnum)
  name: ServiceTypesEnum;
}
