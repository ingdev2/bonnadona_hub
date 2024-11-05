import { Module } from '@nestjs/common';
import { PasswordPolicyService } from './services/password_policy.service';
import { PasswordPolicyController } from './controllers/password_policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordPolicy } from './entities/password_policy.entity';
import { AuditLogsModule } from 'src/audit_logs/audit_logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordPolicy]), AuditLogsModule],
  controllers: [PasswordPolicyController],
  providers: [PasswordPolicyService],
  exports: [PasswordPolicyService],
})
export class PasswordPolicyModule {}
