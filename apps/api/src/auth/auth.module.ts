import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/user/users.module';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { AuditLogsModule } from 'src/audit_logs/audit_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    UsersModule,
    NodemailerModule,
    AuditLogsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
