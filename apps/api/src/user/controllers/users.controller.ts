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
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';

import { RolesEnum } from 'src/utils/enums/roles.enum';
import { UpdateUserProfileDto } from '../dto/update_user_profile.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // POST METHODS //

  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
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

  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Post('/searchCollaborator')
  async searchCollaborator(
    @Body() { idType, idNumber }: SearchCollaboratorDto,
  ) {
    return await this.usersService.searchCollaborator({ idType, idNumber });
  }

  @Post('/getAllCollaboratorFromKactus')
  async getAllCollaboratorFromKactus() {
    return await this.usersService.getAllCollaboratorFromKactus();
  }

  // @EnableAuditLog()
  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Post('/updateUserDataFromKactus/:userId')
  async updateUserDataFromKactus(@Param('userId') userId: string) {
    return await this.usersService.updateUserDataFromKactus(userId);
  }

  // @EnableAuditLog()
  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Post('/updateAllUsersDataFromKactus')
  async updateAllUsersDataFromKactus() {
    return await this.usersService.updateAllUsersDataFromKactus();
  }

  // GET METHODS //

  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAllUsers')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getUser/:id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getCollaboratorUserByIdNumber/:idNumber')
  async getCollaboratorUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.COLLABORATOR,
    ]);
  }

  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getSuperAdminUserByIdNumber/:idNumber')
  async getSuperAdminUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.SUPER_ADMIN,
    ]);
  }

  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAdminUserByIdNumber/:idNumber')
  async getAdminUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.ADMIN,
    ]);
  }

  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAdminsUserByIdNumber/:idNumber')
  async getAdminsUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.SUPER_ADMIN,
      RolesEnum.ADMIN,
    ]);
  }

  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAuditorUserByIdNumber/:idNumber')
  async getAuditorUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.AUDITOR,
    ]);
  }

  @Get('/getUserActiveByTypeAndIdNumber/:idType/:idNumber')
  async getUserActiveByTypeAndIdNumber(
    @Param('idType') idType: number,
    @Param('idNumber') idNumber: number,
  ) {
    return await this.usersService.getUserActiveByTypeAndIdNumber(
      idType,
      idNumber,
    );
  }

  @Get('/getUserRoles/:id')
  async getUserRoles(@Param('id') id: string) {
    return await this.usersService.getUserRoles(id);
  }

  // PATCH METHODS //

  // @EnableAuditLog()
  // @Auth(
  //   AdminRolType.SUPER_ADMIN,
  // )
  @Patch('/updateUser/:id')
  async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUser);
  }

  // @Auth(
  //   AdminRolType.SUPER_ADMIN,
  // )
  @Patch('/updateUserProfile/:id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserProfileDto,
  ) {
    return await this.usersService.updateUserProfile(id, updateUser);
  }

  @Patch('/updateUserPassword/:id')
  async updateUserPassword() {
    return await this.usersService.updateUserPassword();
  }

  @Patch('/forgotUserPassword')
  async forgotUserPassword() {
    return await this.usersService.forgotUserPassword();
  }

  @Patch('/resetUserPassword')
  async resetUserPassword() {
    return await this.usersService.resetUserPassword();
  }

  // @EnableAuditLog()
  // @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/ban/:id')
  async banUser(@Param('id') id: string) {
    return await this.usersService.banUser(id);
  }
}
