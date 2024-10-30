import { PartialType } from '@nestjs/swagger';
import { CreateUserSessionLogDto } from './create-user_session_log.dto';

export class UpdateUserSessionLogDto extends PartialType(
  CreateUserSessionLogDto,
) {}
