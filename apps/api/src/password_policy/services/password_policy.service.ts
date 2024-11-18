import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreatePasswordPolicyDto } from '../dto/create-password_policy.dto';
import { UpdatePasswordPolicyDto } from '../dto/update-password_policy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordPolicy } from '../entities/password_policy.entity';
import { AuditLogsService } from 'src/audit_logs/services/audit_logs.service';

import { ActionTypesEnum } from 'src/utils/enums/audit_logs_enums/action_types.enum';
import { QueryTypesEnum } from 'src/utils/enums/audit_logs_enums/query_types.enum';
import { ModuleNameEnum } from 'src/utils/enums/audit_logs_enums/module_names.enum';

@Injectable()
export class PasswordPolicyService {
  constructor(
    @InjectRepository(PasswordPolicy)
    private passwordPolicyRepository: Repository<PasswordPolicy>,

    private readonly auditLogService: AuditLogsService,
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

    return policy[0];
  }

  // UPDATE FUNTIONS //

  async updatePasswordPolicy(
    passwordPolicy: UpdatePasswordPolicyDto,
    @Req() requestAuditLog: any,
  ) {
    const passwordPolicyFound = await this.passwordPolicyRepository.find();

    if (!passwordPolicyFound && passwordPolicyFound.length >= 2) {
      throw new HttpException(
        `Política de contraseña no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatePasswordPolicy = await this.passwordPolicyRepository.update(
      passwordPolicyFound[0].id,
      passwordPolicy,
    );

    if (updatePasswordPolicy.affected === 0) {
      throw new HttpException(
        `Política de contraseña no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.PASSWORD_POLICY_UPDATE,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.PASSWORD_POLICY_MODULE,
      module_record_id: passwordPolicyFound[0].id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    throw new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
