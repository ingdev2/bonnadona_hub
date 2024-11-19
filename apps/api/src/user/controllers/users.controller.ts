import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ValidateCollaboratorDto } from '../dto/validate_collaborator.dto';
import { SearchCollaboratorDto } from '../dto/search_collaborator.dto';
import { UpdateUserDto } from '../dto/update_user.dto';
import { UpdateUserProfileDto } from '../dto/update_user_profile.dto';
import { UpdatePasswordUserDto } from '../dto/update_password_user.dto';
import { ForgotPasswordUserDto } from '../dto/forgot_password_user.dto';
import { ResetPasswordUserDto } from '../dto/reset_password_user.dto';

import { RolesEnum } from 'src/utils/enums/roles/roles.enum';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // POST METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/validateThatTheCollaboratorExist')
  async validateThatTheCollaboratorExist(
    @Body()
    { idType, idNumber }: ValidateCollaboratorDto,
  ) {
    return await this.usersService.validateThatTheCollaboratorExist({
      idType,
      idNumber,
    });
  }

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/searchCollaborator')
  async searchCollaborator(
    @Body() { idType, idNumber }: SearchCollaboratorDto,
  ) {
    return await this.usersService.searchCollaborator({ idType, idNumber });
  }

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/getAllCollaboratorFromKactus')
  async getAllCollaboratorFromKactus() {
    return await this.usersService.getAllCollaboratorFromKactus();
  }

  @Post('/updateUserDataFromKactus/:userId')
  async updateUserDataFromKactus(@Param('userId') userId: string) {
    return await this.usersService.updateUserDataFromKactus(userId);
  }

  @Post('/updateAllUsersDataFromKactus')
  async updateAllUsersDataFromKactus() {
    return await this.usersService.updateAllUsersDataFromKactus();
  }

  // GET METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.AUDITOR)
  @Get('/getAllUsers')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Get('/getUser/:id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Get('/getUserProfileById/:id')
  async getUserProfileById(@Param('id') id: string) {
    return await this.usersService.getUserProfileById(id);
  }

  @Get('/getUserSessionLogByEmail/:principalEmail')
  async getUserSessionLogByEmail(
    @Param('principalEmail') principalEmail: string,
  ) {
    return await this.usersService.getUserSessionLogByEmail(principalEmail);
  }

  @Get('/getCollaboratorUserByIdNumber/:idNumber')
  async getCollaboratorUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.COLLABORATOR,
    ]);
  }

  @Get('/getSuperAdminUserByIdNumber/:idNumber')
  async getSuperAdminUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.SUPER_ADMIN,
    ]);
  }

  @Get('/getAdminUserByIdNumber/:idNumber')
  async getAdminUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.ADMIN,
    ]);
  }

  @Get('/getAdminsUserByIdNumber/:idNumber')
  async getAdminsUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.SUPER_ADMIN,
      RolesEnum.ADMIN,
    ]);
  }

  @Get('/getAuditorUserByIdNumber/:idNumber')
  async getAuditorUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.AUDITOR,
    ]);
  }

  @Auth(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.COLLABORATOR,
    RolesEnum.AUDITOR,
  )
  @Get('/getUserActiveByIdNumber/:id_number')
  async getUserActiveByIdNumber(@Param('id_number') id_number: number) {
    return await this.usersService.getUserActiveByIdNumber(id_number);
  }

  @Auth(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.COLLABORATOR,
    RolesEnum.AUDITOR,
  )
  @Get('/getUserActiveByEmail/:principal_email')
  async getUserActiveByEmail(
    @Param('principal_email') principal_email: string,
  ) {
    return await this.usersService.getUserActiveByEmail(principal_email);
  }

  @Get('/getUserRoles/:id')
  async getUserRoles(@Param('id') id: string) {
    return await this.usersService.getUserRoles(id);
  }

  @Get('/getUserPermissions/:id')
  async getUserPermissions(@Param('id') id: string) {
    return await this.usersService.getUserPermissions(id);
  }

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Get('/getAllColaboratorPositions')
  async getAllColaboratorPositions() {
    return await this.usersService.getAllColaboratorPositions();
  }

  // PATCH METHODS //

  @EnableAuditLog()
  @Auth(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.COLLABORATOR,
    RolesEnum.AUDITOR,
  )
  @Patch('/updateUser/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.usersService.updateUser(id, updateUser, requestAuditLog);
  }

  @EnableAuditLog()
  @Auth(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.COLLABORATOR,
    RolesEnum.AUDITOR,
  )
  @Patch('/updateUserProfile/:id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserProfileDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.usersService.updateUserProfile(
      id,
      updateUser,
      requestAuditLog,
    );
  }

  @EnableAuditLog()
  @Auth(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.COLLABORATOR,
    RolesEnum.AUDITOR,
  )
  @Patch('/updateUserPassword/:id')
  async updateUserPassword(
    @Param('id')
    id: string,
    @Body()
    passwords: UpdatePasswordUserDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.usersService.updateUserPassword(
      id,
      passwords,
      requestAuditLog,
    );
  }

  @Patch('/forgotUserPassword')
  async forgotUserPassword(
    @Body()
    { user_id_type, id_number, birthdate }: ForgotPasswordUserDto,
  ) {
    return await this.usersService.forgotUserPassword({
      user_id_type,
      id_number,
      birthdate,
    });
  }

  @Patch('/resetUserPassword')
  async resetUserPassword(
    @Query('token') token: string,
    @Body()
    { newPassword }: ResetPasswordUserDto,
  ) {
    return await this.usersService.resetUserPassword(token, { newPassword });
  }

  @EnableAuditLog()
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Patch('/ban/:id')
  async banUser(@Param('id') id: string, @Req() requestAuditLog: any) {
    return await this.usersService.banUser(id, requestAuditLog);
  }

  @Patch('/banAllUsersForInactivity')
  async banAllUsersForInactivity() {
    return await this.usersService.banAllUsersForInactivity();
  }
}
