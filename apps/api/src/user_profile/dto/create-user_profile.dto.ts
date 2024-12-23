import { IsOptional, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsOptional()
  user_blood_group: number;

  @IsOptional()
  @IsString()
  profile_photo: string;

  @IsOptional()
  @IsString()
  affiliation_eps: string;

  @IsOptional()
  @IsString()
  residence_department: string;

  @IsOptional()
  @IsString()
  residence_city: string;

  @IsOptional()
  @IsString()
  residence_address: string;

  @IsOptional()
  @IsString()
  residence_neighborhood: string;

  @IsOptional()
  @IsString()
  user_height: string;

  @IsOptional()
  @IsString()
  user_weight: string;

  @IsOptional()
  @IsString()
  user_shirt_size: string;

  @IsOptional()
  @IsString()
  user_pants_size: string;

  @IsOptional()
  @IsString()
  user_shoe_size: string;
}
