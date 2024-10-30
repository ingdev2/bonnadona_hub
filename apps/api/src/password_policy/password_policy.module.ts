import { Module } from '@nestjs/common';
import { PasswordPolicyService } from './services/password_policy.service';
import { PasswordPolicyController } from './controllers/password_policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordPolicy } from './entities/password_policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordPolicy])],
  controllers: [PasswordPolicyController],
  providers: [PasswordPolicyService],
  exports: [PasswordPolicyService],
})
export class PasswordPolicyModule {}
