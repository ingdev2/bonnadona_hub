import { PartialType } from '@nestjs/swagger';
import { CreatePasswordHistoryDto } from './create-password_history.dto';

export class UpdatePasswordHistoryDto extends PartialType(CreatePasswordHistoryDto) {}
