import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';

import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { LoginDto } from '../dto/login.dto';
import { PrincipalEmailDto } from '../dto/principal_email.dto';

import { RolesEnum } from 'src/utils/enums/roles/roles.enum';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER //

  @EnableAuditLog()
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/registerUserCollaborator')
  async registerUserCollaborator(
    @Body() registerUserCollaborator: CreateUserDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.authService.registerUserCollaborator(
      registerUserCollaborator,
      requestAuditLog,
    );
  }

  @EnableAuditLog()
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/registerUserCollaboratorFromBonnadonaHub')
  async registerUserCollaboratorFromBonnadonaHub(
    @Body() registerUserCollaborator: CreateUserDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.authService.registerUserCollaboratorFromBonnadonaHub(
      registerUserCollaborator,
      requestAuditLog,
    );
  }

  @Post('/createAllNewUsersFromKactus')
  async createAllNewUsersFromKactus() {
    return await this.authService.createAllNewUsersFromKactus();
  }

  // LOGIN //

  @Post('refreshToken')
  async refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];

    return this.authService.refreshToken(token);
  }

  @Post('loginCollaboratorUser')
  async loginCollaboratorUser(@Body() loginCollaborator: LoginDto) {
    return await this.authService.loginCollaboratorUser(loginCollaborator);
  }

  @Post('loginAdminAndAuditorUser')
  async loginAdminAndAuditorUser(@Body() loginCollaborator: LoginDto) {
    return await this.authService.loginAdminAndAuditorUser(loginCollaborator);
  }

  @EnableAuditLog()
  @Post('verifyCodeAndLoginCollaboratorUser/:principal_email')
  async verifyCodeAndLoginCollaboratorUser(
    @Param('principal_email') principal_email: string,
    @Body('verification_code') verification_code: number,
    @Req() requestAuditLog: any,
  ) {
    return await this.authService.verifyCodeAndLoginCollaboratorUser(
      principal_email,
      verification_code,
      requestAuditLog,
    );
  }

  @EnableAuditLog()
  @Post('verifyCodeAndLoginAdminAndAuditorUser/:principal_email')
  async verifyCodeAndLoginAdminAndAuditorUser(
    @Param('principal_email') principal_email: string,
    @Body('verification_code') verification_code: number,
    @Req() requestAuditLog: any,
  ) {
    return await this.authService.verifyCodeAndLoginAdminAndAuditorUser(
      principal_email,
      verification_code,
      requestAuditLog,
    );
  }

  @EnableAuditLog()
  @Post('userLoginToApp/:userIdNumber')
  async userLoginToApp(
    @Param('userIdNumber') userIdNumber: number,
    @Body('appName') appName: string,
    @Req() requestAuditLog: any,
  ) {
    return await this.authService.userLoginToApp(
      userIdNumber,
      appName,
      requestAuditLog,
    );
  }

  @Post('resendVerificationUserCode')
  async resendVerificationUserCode(@Body() principal_email: PrincipalEmailDto) {
    return await this.authService.resendVerificationUserCode(principal_email);
  }
}
