import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Transform(({ value }) => value.trim().toUpperCase())
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  applications: number[];

  @IsNotEmpty()
  application_modules: number[];

  @IsNotEmpty()
  module_actions: number[];
}
