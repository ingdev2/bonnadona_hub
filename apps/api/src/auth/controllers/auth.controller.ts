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
import { IdUserDto } from '../dto/id_user.dto';

import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/registerUserCollaborator')
  async registerUserCollaborator(
    @Body() registerUserCollaborator: CreateUserDto,
  ) {
    return await this.authService.registerUserCollaborator(
      registerUserCollaborator,
    );
  }

  @Post('/createAllNewUsersFromKactus')
  async createAllNewUsersFromKactus() {
    return await this.authService.createAllNewUsersFromKactus();
  }

  // LOGIN //

  @Post('loginCollaboratorUser')
  async loginCollaboratorUser(@Body() loginCollaborator: LoginDto) {
    return await this.authService.loginCollaboratorUser(loginCollaborator);
  }

  @Post('loginAdminAndAuditorUser')
  async loginAdminAndAuditorUser(@Body() loginCollaborator: LoginDto) {
    return await this.authService.loginAdminAndAuditorUser(loginCollaborator);
  }

  @Post('verifyCodeAndLoginUser/:id_number')
  async verifyCodeAndLoginUser(
    @Param('id_number') id_number: number,
    @Body('verification_code') verification_code: number,
  ) {
    return await this.authService.verifyCodeAndLoginUser(
      id_number,
      verification_code,
    );
  }

  @Post('resendVerificationUserCode')
  async resendVerificationUserCode(@Body() { id_type, id_number }: IdUserDto) {
    return await this.authService.resendVerificationUserCode({
      id_type,
      id_number,
    });
  }
}
