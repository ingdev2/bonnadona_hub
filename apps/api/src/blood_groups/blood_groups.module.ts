import { Module } from '@nestjs/common';
import { BloodGroupsService } from './services/blood_groups.service';
import { BloodGroupsController } from './controllers/blood_groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodGroup } from './entities/blood_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BloodGroup])],
  controllers: [BloodGroupsController],
  providers: [BloodGroupsService],
})
export class BloodGroupsModule {}
