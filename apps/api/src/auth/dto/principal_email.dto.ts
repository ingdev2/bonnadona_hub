import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class PrincipalEmailDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: '¡Correo no ingresado!' })
  @IsEmail()
  principal_email: string;
}
