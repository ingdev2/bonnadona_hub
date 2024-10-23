import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
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

  @IsOptional()
  @IsArray()
  roleIdsToAdd: number[];

  @IsOptional()
  @IsArray()
  roleIdsToRemove: number[];
}
