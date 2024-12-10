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
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles/roles.enum';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // POST METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/create')
  createPermission(@Body() createPermission: CreatePermissionDto) {
    return this.permissionsService.createPermission(createPermission);
  }

  // GET METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Get('/getAll')
  getAllPermissions() {
    return this.permissionsService.getAllPermissions();
  }

  // @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Get('/getPermission/:id')
  getPermission(@Param('id') id: string) {
    return this.permissionsService.getPermission(id);
  }

  // PATCH METHODS //

  @EnableAuditLog()
  // @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Patch('/update/:id')
  modifyPermission(
    @Param('id') id: string,
    @Body() updatePermission: UpdatePermissionDto,
    @Req() requestAuditLog: any,
  ) {
    return this.permissionsService.modifyPermission(
      id,
      updatePermission,
      requestAuditLog,
    );
  }
}
