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

import { RolesEnum } from 'src/utils/enums/roles.enum';
import { UpdateUserProfileDto } from '../dto/update_user_profile.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';

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

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
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

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
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

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  @Patch('/updateUser/:id')
  async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUser);
  }

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  @Patch('/updateUserProfile/:id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserProfileDto,
  ) {
    return await this.usersService.updateUserProfile(id, updateUser);
  }

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
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

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Patch('/ban/:id')
  async banUser(@Param('id') id: string) {
    return await this.usersService.banUser(id);
  }
}
