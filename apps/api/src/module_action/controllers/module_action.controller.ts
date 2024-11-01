import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleActionService } from '../services/module_action.service';
import { CreateModuleActionDto } from '../dto/create-module_action.dto';
import { UpdateModuleActionDto } from '../dto/update-module_action.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles/roles.enum';

@ApiTags('module-action')
@ApiBearerAuth()
@Controller('module-action')
export class ModuleActionController {
  constructor(private readonly moduleActionService: ModuleActionService) {}

  // POST METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/create')
  createModuleAction(@Body() createModuleAction: CreateModuleActionDto) {
    return this.moduleActionService.createModuleAction(createModuleAction);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllModuleActions() {
    return this.moduleActionService.getAllModuleActions();
  }

  @Get('/getModuleAction/:id')
  getModuleActionById(@Param('id') id: number) {
    return this.moduleActionService.getModuleActionById(id);
  }

  // PATCH METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Patch('/update/:id')
  updateModuleAction(
    @Param('id') id: number,
    @Body() updateModuleAction: UpdateModuleActionDto,
  ) {
    return this.moduleActionService.updateModuleAction(id, updateModuleAction);
  }
}
