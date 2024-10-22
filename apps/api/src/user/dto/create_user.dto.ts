import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserPatientDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  user_id_type: number;

  @IsNotEmpty()
  id_number: number;

  @IsNotEmpty()
  user_gender: number;

  @IsOptional()
  @IsDateString()
  birthdate: Date;

  @IsOptional()
  @IsEmail()
  corporate_email: string;

  @IsOptional()
  corporate_cellphone: number;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  password: string;
}
