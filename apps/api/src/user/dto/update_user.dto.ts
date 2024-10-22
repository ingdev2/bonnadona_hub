import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserPatientDto {
  @IsOptional()
  @IsEmail()
  corporate_email: string;

  @IsOptional()
  corporate_cellphone: number;
}
