import { IsNotEmpty } from 'class-validator';

export class SearchCollaboratorDto {
  @IsNotEmpty()
  idType: number;

  @IsNotEmpty()
  idNumber: number;
}
