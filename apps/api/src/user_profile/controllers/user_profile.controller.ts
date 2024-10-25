import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserProfileService } from '../services/user_profile.service';
import { CreateUserProfileDto } from '../dto/create-user_profile.dto';
import { UpdateUserProfileDto } from '../dto/update-user_profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
}
