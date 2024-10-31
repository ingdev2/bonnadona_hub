import { Injectable } from '@nestjs/common';
import { CreateModuleActionDto } from '../dto/create-module_action.dto';
import { UpdateModuleActionDto } from '../dto/update-module_action.dto';

@Injectable()
export class ModuleActionService {
  create(createModuleActionDto: CreateModuleActionDto) {
    return 'This action adds a new moduleAction';
  }

  findAll() {
    return `This action returns all moduleAction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moduleAction`;
  }

  update(id: number, updateModuleActionDto: UpdateModuleActionDto) {
    return `This action updates a #${id} moduleAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduleAction`;
  }
}
