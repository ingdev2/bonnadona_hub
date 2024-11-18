import { IsDateString, IsOptional } from 'class-validator';

export class CreateUserSessionLogDto {
  @IsOptional()
  successful_login_counter: number;

  @IsOptional()
  @IsDateString()
  last_login: Date;

  @IsOptional()
  failed_login_attempts_counter: number;
}
