import { Injectable } from '@nestjs/common';
import { CreatePasswordHistoryDto } from '../dto/create-password_history.dto';
import { UpdatePasswordHistoryDto } from '../dto/update-password_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordHistory } from '../entities/password_history.entity';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class PasswordHistoryService {
  constructor(
    @InjectRepository(PasswordHistory)
    private passwordHistoryRepository: Repository<PasswordHistory>,
  ) {}

  // CREATE FUNTIONS //

  async addPasswordToHistory(userId: string, hashedPassword: string) {
    const passwordHistoryEntry = this.passwordHistoryRepository.create({
      user_id: userId,
      old_password: hashedPassword,
    });

    return await this.passwordHistoryRepository.save(passwordHistoryEntry);
  }

  // GET FUNTIONS //

  async isPasswordInHistory(
    userId: string,
    newPassword: string,
    limit: number,
  ) {
    const recentPasswords = await this.passwordHistoryRepository.find({
      where: { user_id: userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });

    for (const historyEntry of recentPasswords) {
      const isMatch = await bcryptjs.compare(
        newPassword,
        historyEntry.old_password,
      );

      if (isMatch) {
        return true;
      }
    }

    return false;
  }
}
