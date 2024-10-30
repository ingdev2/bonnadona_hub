import { Module } from '@nestjs/common';
import { PasswordHistoryService } from './services/password_history.service';
import { PasswordHistoryController } from './controllers/password_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHistory } from './entities/password_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordHistory])],
  controllers: [PasswordHistoryController],
  providers: [PasswordHistoryService],
  exports: [PasswordHistoryService],
})
export class PasswordHistoryModule {}
