import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BloodGroupsService } from '../services/blood_groups.service';
import { CreateBloodGroupDto } from '../dto/create-blood_group.dto';
import { UpdateBloodGroupDto } from '../dto/update-blood_group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('blood-groups')
@ApiBearerAuth()
@Controller('blood-groups')
export class BloodGroupsController {
  constructor(private readonly bloodGroupsService: BloodGroupsService) {}

  // POST METHODS //

  @Post('/create')
  createBloodGroup(@Body() createBloodGroup: CreateBloodGroupDto) {
    return this.bloodGroupsService.createBloodGroup(createBloodGroup);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllBloodGroups() {
    return this.bloodGroupsService.getAllBloodGroups();
  }

  @Get('/getBloodGroup/:id')
  getBloodGroupById(@Param('id') id: number) {
    return this.bloodGroupsService.getBloodGroupById(id);
  }

  // PATCH METHODS //

  @Patch('/update/:id')
  updateBloodGroup(
    @Param('id') id: number,
    @Body() updateBloodGroup: UpdateBloodGroupDto,
  ) {
    return this.bloodGroupsService.updateBloodGroup(id, updateBloodGroup);
  }
}