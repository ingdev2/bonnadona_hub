import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserProfile } from 'src/user_profile/entities/user_profile.entity';
import { BloodGroupEnums } from '../enums/blood_group.enum';

@Entity()
export class BloodGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: BloodGroupEnums })
  name: BloodGroupEnums;

  @OneToMany(() => UserProfile, (user_profile) => user_profile.blood_group)
  user_profile: UserProfile[];
}
