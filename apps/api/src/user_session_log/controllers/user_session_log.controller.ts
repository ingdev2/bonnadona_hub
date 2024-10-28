import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserSessionLogService } from '../services/user_session_log.service';
import { CreateUserSessionLogDto } from '../dto/create-user_session_log.dto';
import { UpdateUserSessionLogDto } from '../dto/update-user_session_log.dto';

@Controller('session-log')
export class UserSessionLogController {
  constructor(private readonly sessionLogService: UserSessionLogService) {}
}
