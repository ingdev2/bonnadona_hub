import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePasswordPolicyDto } from '../dto/create-password_policy.dto';
import { UpdatePasswordPolicyDto } from '../dto/update-password_policy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordPolicy } from '../entities/password_policy.entity';

@Injectable()
export class PasswordPolicyService {
  constructor(
    @InjectRepository(PasswordPolicy)
    private passwordPolicyRepository: Repository<PasswordPolicy>,
  ) {}

  // CREATE FUNTIONS //

  async createPasswordPolicy(policy: CreatePasswordPolicyDto) {
    const existingPolicy = await this.passwordPolicyRepository.find();

    if (existingPolicy.length > 0) {
      throw new HttpException(
        'Ya existe una política de contraseñas.',
        HttpStatus.CONFLICT,
      );
    }

    const newPolicy = this.passwordPolicyRepository.create(policy);

    return await this.passwordPolicyRepository.save(newPolicy);
  }

  // GET FUNTIONS //

  async getPasswordPolicy() {
    const policy = await this.passwordPolicyRepository.find();

    if (!policy) {
      throw new HttpException(
        'No hay política de contraseñas configurada.',
        HttpStatus.NOT_FOUND,
      );
    }

    return policy;
  }

  // UPDATE FUNTIONS //

  async updatePasswordPolicy(
    id: number,
    passwordPolicy: UpdatePasswordPolicyDto,
  ) {
    const passwordPolicyFound = await this.passwordPolicyRepository.findOneBy({
      id,
    });

    if (!passwordPolicyFound) {
      throw new HttpException(
        `Política de contraseña no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatePasswordPolicy = await this.passwordPolicyRepository.update(
      id,
      passwordPolicy,
    );

    if (updatePasswordPolicy.affected === 0) {
      throw new HttpException(
        `Política de contraseña no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
