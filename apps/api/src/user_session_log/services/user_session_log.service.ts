import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSessionLog } from '../entities/user_session_log.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateUserSessionLogDto } from '../dto/create-user_session_log.dto';
import { UpdateUserSessionLogDto } from '../dto/update-user_session_log.dto';

const schedule = require('node-schedule');

@Injectable()
export class UserSessionLogService {
  constructor(
    @InjectRepository(UserSessionLog)
    private userSessionLogRepository: Repository<UserSessionLog>,

    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // UPDATE FUNTIONS //

  async banUser(id: string) {
    const userFound = await this.userRepository.findOne({ where: { id } });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    userFound.is_active = false;

    userFound.banned_user_until = new Date(Date.now() + 2 * 60 * 1000);

    await this.userRepository.save(userFound);

    schedule.scheduleJob(userFound.banned_user_until, async () => {
      userFound.is_active = true;
      userFound.banned_user_until = null;

      await this.userRepository.save(userFound);
    });

    throw new HttpException(
      `El usuario con número de ID: ${userFound.id_number} ha sido bloqueado temporalmente.`,
      HttpStatus.ACCEPTED,
    );
  }

  async updateUserSessionLog(id: string, successful_login: boolean) {
    const userFound = await this.userRepository.findOneBy({
      id,
      is_active: true,
    });

    if (!userFound) {
      throw new HttpException(`Usuario no encontrado.`, HttpStatus.NOT_FOUND);
    }

    const sessionLog = await this.userSessionLogRepository.findOne({
      where: { id: userFound.user_session_log.id },
    });

    if (!sessionLog) {
      throw new HttpException(
        `Session de usuario no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (successful_login) {
      sessionLog.successful_login_counter++;
      sessionLog.failed_login_attempts_counter = 0;

      sessionLog.last_login = new Date();
    } else {
      sessionLog.failed_login_attempts_counter++;

      if (sessionLog.failed_login_attempts_counter === 3) {
        throw new HttpException(
          `Advertencia: lleva 3 intentos fallidos de inicio de sesión. Al quinto intento, su cuenta será bloqueada temporalmente.`,
          HttpStatus.FORBIDDEN,
        );
      }

      if (sessionLog.failed_login_attempts_counter === 5) {
        await this.banUser(userFound.id);
        throw new HttpException(
          `Su cuenta ha sido bloqueada debido a múltiples intentos fallidos de inicio de sesión. Estará bloqueada por 30 minutos.`,
          HttpStatus.FORBIDDEN,
        );
      }
    }

    const updateUserSessionLog = await this.userSessionLogRepository.update(
      { id: userFound.user_session_log.id },
      sessionLog,
    );

    if (updateUserSessionLog.affected === 0) {
      return new HttpException(
        `Session de usuario no encontrada`,
        HttpStatus.CONFLICT,
      );
    }
  }
}
