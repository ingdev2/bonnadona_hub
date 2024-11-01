import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModuleActionDto {
  @Transform(({ value }) => value.trim().toUpperCase())
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  app_module_id: number;
}
