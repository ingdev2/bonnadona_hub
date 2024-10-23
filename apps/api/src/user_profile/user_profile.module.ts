import { Module } from '@nestjs/common';
import { UserProfileService } from './services/user_profile.service';
import { UserProfileController } from './controllers/user_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user_profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
