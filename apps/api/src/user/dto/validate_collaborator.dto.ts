import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateCollaboratorDto {
  @IsNotEmpty()
  @IsString()
  idType: string;

  @IsNotEmpty()
  idNumber: number;
}
