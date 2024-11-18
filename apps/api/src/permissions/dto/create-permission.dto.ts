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
  app_ids: number[];

  @IsNotEmpty()
  app_module_ids: number[];

  @IsNotEmpty()
  module_action_ids: number[];
}
