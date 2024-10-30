import { IsBoolean, IsOptional, Max, Min } from 'class-validator';

export class UpdatePasswordPolicyDto {
  @IsOptional()
  @Min(5, {
    message:
      'La longitud mínima recomendada para la contraseña es de 5 caracteres mínimos.',
  })
  @Max(20, {
    message:
      'La longitud mínima recomendada para la contraseña es de 20 caracteres máximos',
  })
  min_length: number;

  @IsOptional()
  @IsBoolean()
  require_uppercase: boolean;

  @IsOptional()
  @IsBoolean()
  require_lowercase: boolean;

  @IsOptional()
  @IsBoolean()
  require_numbers: boolean;

  @IsOptional()
  @IsBoolean()
  require_special_characters: boolean;

  @IsOptional()
  @Min(1, { message: 'El tiempo de caducidad debe ser al menos de 1 día' })
  @Max(100, { message: 'El tiempo de caducidad no puede superar los 100 días' })
  password_expiry_days: number;

  @IsOptional()
  @Min(1, { message: 'El tiempo de inactividad debe ser al menos de 1 día' })
  @Max(60, { message: 'El tiempo de inactividad no puede superar los 60 días' })
  inactivity_days: number;

  @IsOptional()
  @Min(1, { message: 'El límite de historial debe ser al menos de 1' })
  @Max(10, { message: 'El límite de historial no puede superar los 10' })
  password_history_limit: number;
}
