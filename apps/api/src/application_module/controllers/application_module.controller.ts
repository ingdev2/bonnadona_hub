import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApplicationModuleService } from '../services/application_module.service';
import { CreateApplicationModuleDto } from '../dto/create-application_module.dto';
import { UpdateApplicationModuleDto } from '../dto/update-application_module.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles/roles.enum';

@ApiTags('application-module')
@ApiBearerAuth()
@Controller('application-module')
export class ApplicationModuleController {
  constructor(
    private readonly applicationModuleService: ApplicationModuleService,
  ) {}

  // POST METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/create')
  createAppModule(@Body() createAppModule: CreateApplicationModuleDto) {
    return this.applicationModuleService.createAppModule(createAppModule);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllAppModules() {
    return this.applicationModuleService.getAllAppModules();
  }

  @Get('/getAppModule/:id')
  getAppModuleById(@Param('id') id: number) {
    return this.applicationModuleService.getAppModuleById(id);
  }

  // PATCH METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Patch('/update/:id')
  updateAppModule(
    @Param('id') id: number,
    @Body() updateAppModule: UpdateApplicationModuleDto,
  ) {
    return this.applicationModuleService.updateAppModule(id, updateAppModule);
  }
}
