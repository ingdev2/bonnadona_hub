import { Module } from '@nestjs/common';
import { UserSessionLogService } from './services/user_session_log.service';
import { UserSessionLogController } from './controllers/user_session_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSessionLog } from './entities/user_session_log.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSessionLog, User])],
  controllers: [UserSessionLogController],
  providers: [UserSessionLogService],
  exports: [UserSessionLogService],
})
export class UserSessionLogModule {}
