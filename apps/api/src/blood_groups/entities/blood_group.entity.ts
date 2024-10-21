import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BloodGroupEnums } from '../enums/blood_group.enum';

@Entity()
export class BloodGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: BloodGroupEnums })
  name: BloodGroupEnums;

  @OneToMany(() => User, (user) => user.blood_group)
  user: User[];
}
