import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationModuleDto {
  @Transform(({ value }) => value.trim().toUpperCase())
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  app_id: number;
}
