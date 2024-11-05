import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PasswordPolicyService } from '../services/password_policy.service';
import { CreatePasswordPolicyDto } from '../dto/create-password_policy.dto';
import { UpdatePasswordPolicyDto } from '../dto/update-password_policy.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles/roles.enum';

@ApiTags('password-policy')
@ApiBearerAuth()
@Controller('password-policy')
export class PasswordPolicyController {
  constructor(private readonly passwordPolicyService: PasswordPolicyService) {}

  // POST METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/create')
  createPasswordPolicy(@Body() createPasswordPolicy: CreatePasswordPolicyDto) {
    return this.passwordPolicyService.createPasswordPolicy(
      createPasswordPolicy,
    );
  }

  // GET METHODS //

  @Get('/getPasswordPolicy')
  getPasswordPolicy() {
    return this.passwordPolicyService.getPasswordPolicy();
  }

  // PATCH METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Patch('/update/:id')
  updatePasswordPolicy(
    @Param('id') id: number,
    @Body() updatePasswordPolicy: UpdatePasswordPolicyDto,
  ) {
    return this.passwordPolicyService.updatePasswordPolicy(
      id,
      updatePasswordPolicy,
    );
  }
}
