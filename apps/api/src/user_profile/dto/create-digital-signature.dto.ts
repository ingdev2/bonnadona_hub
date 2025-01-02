import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDigitalSignatureDto {
  @IsNotEmpty({ message: '¡La firma no puede ir vacia!' })
  @IsString()
  digital_signature: string;
}
