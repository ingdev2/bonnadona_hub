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
import { ApplicationService } from '../services/application.service';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles/roles.enum';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('application')
@ApiBearerAuth()
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // POST METHODS //

  @EnableAuditLog()
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/create')
  createApplication(
    @Body() createApplication: CreateApplicationDto,
    @Req() requestAuditLog: any,
  ) {
    return this.applicationService.createApplication(
      createApplication,
      requestAuditLog,
    );
  }

  // GET METHODS //

  @Get('/getAll')
  getAllApplications() {
    return this.applicationService.getAllApplications();
  }

  @Get('/getAllActive')
  getAllActiveApplications() {
    return this.applicationService.getAllActiveApplications();
  }

  @Get('/getApplication/:id')
  getApplicationById(@Param('id') id: number) {
    return this.applicationService.getApplicationById(id);
  }

  // PATCH METHODS //

  @EnableAuditLog()
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Patch('/update/:id')
  updateApplication(
    @Param('id') id: number,
    @Body() updateApplication: UpdateApplicationDto,
    @Req() requestAuditLog: any,
  ) {
    return this.applicationService.updateApplication(
      id,
      updateApplication,
      requestAuditLog,
    );
  }

  @EnableAuditLog()
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Patch('/ban/:id')
  async banApplication(@Param('id') id: number, @Req() requestAuditLog: any) {
    return await this.applicationService.banApplication(id, requestAuditLog);
  }
}
