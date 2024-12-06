import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image_path: string;

  @IsNotEmpty()
  @IsString()
  entry_link: string;
}
