import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';

import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { LoginDto } from '../dto/login.dto';

import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER //

  // @EnableAuditLog()
  // @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/registerUserCollaborator')
  async registerUserCollaborator(
    @Body() registerUserCollaborator: CreateUserDto,
  ) {
    return await this.authService.registerUserCollaborator(
      registerUserCollaborator,
    );
  }

  // LOGIN //

  @Post('loginCollaboratorUser')
  async loginCollaboratorUser(@Body() loginCollaborator: LoginDto) {
    return await this.authService.loginCollaboratorUser(loginCollaborator);
  }
}
