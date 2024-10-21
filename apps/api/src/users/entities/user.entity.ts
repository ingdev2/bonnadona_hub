import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IdType } from 'src/id_types/entities/id_type.entity';
import { GenderType } from 'src/gender_types/entities/gender_type.entity';
import { BloodGroup } from 'src/blood_groups/entities/blood_group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  last_name: string;

  @ManyToOne(() => IdType, (id_type) => id_type.user)
  @JoinColumn({ name: 'user_id_type', referencedColumnName: 'id' })
  id_type: IdType;

  @Column()
  user_id_type: number;

  @Column({ type: 'bigint', unique: true })
  id_number: number;

  @ManyToOne(() => GenderType, (gender) => gender.user)
  @JoinColumn({ name: 'user_gender', referencedColumnName: 'id' })
  gender: GenderType;

  @Column({ nullable: true })
  user_gender: number;

  @ManyToOne(() => BloodGroup, (blood_group) => blood_group.user)
  @JoinColumn({ name: 'user_blood_group', referencedColumnName: 'id' })
  blood_group: BloodGroup;

  @Column({ nullable: true })
  user_blood_group: number;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'text', nullable: true })
  corporate_email: string;

  @Column({ type: 'bigint', nullable: true })
  corporate_cellphone: number;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  reset_password_token: string;

  @Column({ nullable: true })
  authentication_method: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
