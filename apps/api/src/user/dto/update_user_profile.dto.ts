import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserHeightEnum } from 'src/utils/enums/user_profile/user_height.enum';
import { UserPantsSizeEnum } from 'src/utils/enums/user_profile/user_pants_size.enum';
import { UserShirtSizeEnum } from 'src/utils/enums/user_profile/user_shirt_size.enum';
import { UserShoeSizeEnum } from 'src/utils/enums/user_profile/user_shoe_size.enum';
import { UserWeightEnum } from 'src/utils/enums/user_profile/user_weight.enum';

export class UpdateUserProfileDto {
  @IsOptional()
  user_blood_group: number;

  @IsOptional()
  @IsArray()
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
  @IsEnum(UserHeightEnum)
  user_height: UserHeightEnum;

  @IsOptional()
  @IsEnum(UserWeightEnum)
  user_weight: UserWeightEnum;

  @IsOptional()
  @IsEnum(UserShirtSizeEnum)
  user_shirt_size: UserShirtSizeEnum;

  @IsOptional()
  @IsEnum(UserPantsSizeEnum)
  user_pants_size: UserPantsSizeEnum;

  @IsOptional()
  @IsEnum(UserShoeSizeEnum)
  user_shoe_size: UserShoeSizeEnum;
}
