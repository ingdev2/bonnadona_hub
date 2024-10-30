import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PasswordHistoryService } from '../services/password_history.service';
import { CreatePasswordHistoryDto } from '../dto/create-password_history.dto';
import { UpdatePasswordHistoryDto } from '../dto/update-password_history.dto';

@Controller('password-history')
export class PasswordHistoryController {
  constructor(
    private readonly passwordHistoryService: PasswordHistoryService,
  ) {}
}
