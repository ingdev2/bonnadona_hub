import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { BloodGroup } from 'src/blood_groups/entities/blood_group.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BloodGroup, (blood_group) => blood_group.user_profile)
  @JoinColumn({ name: 'user_blood_group', referencedColumnName: 'id' })
  blood_group: BloodGroup;

  @Column({ nullable: true })
  user_blood_group: number;

  @Column({ type: 'text', array: true, nullable: true })
  profile_photo: string[];

  @Column({ type: 'text', nullable: true })
  affiliation_eps: string;

  @Column({ nullable: true })
  residence_department: string;

  @Column({ nullable: true })
  residence_city: string;

  @Column({ nullable: true })
  residence_address: string;

  @Column({ nullable: true })
  residence_neighborhood: string;

  @Column({ type: 'text', array: true, nullable: true })
  digital_signature: string[];

  @Column({ type: 'text', nullable: true })
  user_height: string;

  @Column({ type: 'text', nullable: true })
  user_weight: string;

  @Column({ type: 'text', nullable: true })
  user_shirt_size: string;

  @Column({ type: 'text', nullable: true })
  user_pants_size: string;

  @Column({ type: 'text', nullable: true })
  user_shoe_size: string;

  @OneToOne(() => User, (user) => user.user_profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
