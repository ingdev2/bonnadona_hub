import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordUserDto {
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
