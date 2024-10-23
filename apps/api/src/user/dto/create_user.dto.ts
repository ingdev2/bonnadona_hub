import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
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

  @IsOptional()
  user_gender: number;

  @IsOptional()
  @IsDateString()
  birthdate: Date;

  @IsOptional()
  @IsEmail()
  principal_email: string;

  @IsOptional()
  @IsEmail()
  corporate_email: string;

  @IsOptional()
  corporate_cellphone: number;

  @IsOptional()
  @IsEmail()
  personal_email: string;

  @IsOptional()
  personal_cellphone: number;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  collaborator_service_type: number;

  @IsOptional()
  @IsString()
  collaborator_immediate_boss: string;

  @IsOptional()
  @IsString()
  collaborator_unit: string;

  @IsOptional()
  @IsString()
  collaborator_service: string;

  @IsOptional()
  @IsString()
  collaborator_position: string;

  @IsOptional()
  collaborator_position_level: number;
}
