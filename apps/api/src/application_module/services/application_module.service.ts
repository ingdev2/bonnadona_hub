import { Injectable } from '@nestjs/common';
import { CreateApplicationModuleDto } from '../dto/create-application_module.dto';
import { UpdateApplicationModuleDto } from '../dto/update-application_module.dto';

@Injectable()
export class ApplicationModuleService {
  create(createApplicationModuleDto: CreateApplicationModuleDto) {
    return 'This action adds a new applicationModule';
  }

  findAll() {
    return `This action returns all applicationModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicationModule`;
  }

  update(id: number, updateApplicationModuleDto: UpdateApplicationModuleDto) {
    return `This action updates a #${id} applicationModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicationModule`;
  }
}
