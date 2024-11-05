import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceTypesService } from '../services/service_types.service';
import { CreateServiceTypeDto } from '../dto/create-service_type.dto';
import { UpdateServiceTypeDto } from '../dto/update-service_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles/roles.enum';

@ApiTags('service-types')
@ApiBearerAuth()
@Controller('service-types')
export class ServiceTypesController {
  constructor(private readonly serviceTypesService: ServiceTypesService) {}

  // POST METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Post('/create')
  createServiceType(@Body() createServiceType: CreateServiceTypeDto) {
    return this.serviceTypesService.createServiceType(createServiceType);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllServiceTypes() {
    return this.serviceTypesService.getAllServiceTypes();
  }

  @Get('/getServiceType/:id')
  getServiceTypeById(@Param('id') id: number) {
    return this.serviceTypesService.getServiceTypeById(id);
  }

  // PATCH METHODS //

  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Patch('/update/:id')
  updateServiceType(
    @Param('id') id: number,
    @Body() updateServiceType: UpdateServiceTypeDto,
  ) {
    return this.serviceTypesService.updateServiceType(id, updateServiceType);
  }
}
