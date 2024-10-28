import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  @IsEmail()
  principal_email: string;

  @Transform(({ value }) => value.trim())
  @IsOptional({ message: '¡Datos ingresados incorrectos!' })
  @IsString()
  password: string;
}
