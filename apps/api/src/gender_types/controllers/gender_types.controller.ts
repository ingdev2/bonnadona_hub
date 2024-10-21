import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenderTypesService } from '../services/gender_types.service';
import { CreateGenderTypeDto } from '../dto/create-gender_type.dto';
import { UpdateGenderTypeDto } from '../dto/update-gender_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('gender-types')
@ApiBearerAuth()
@Controller('gender-types')
export class GenderTypesController {
  constructor(private readonly genderTypesService: GenderTypesService) {}

  // POST METHODS //

  @Post('/create')
  createGenderType(@Body() createGenderType: CreateGenderTypeDto) {
    return this.genderTypesService.createGenderType(createGenderType);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllGenderTypes() {
    return this.genderTypesService.getAllGenderTypes();
  }

  @Get('/getGenderType/:id')
  getGenderTypeById(@Param('id') id: number) {
    return this.genderTypesService.getGenderTypeById(id);
  }

  // PATCH METHODS //

  @Patch('/update/:id')
  updateGenderType(
    @Param('id') id: number,
    @Body() updateGenderType: UpdateGenderTypeDto,
  ) {
    return this.genderTypesService.updateGenderType(id, updateGenderType);
  }
}
