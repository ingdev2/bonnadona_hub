import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { IdType } from 'src/id_types/entities/id_type.entity';
import { GenderType } from 'src/gender_types/entities/gender_type.entity';
import { Role } from 'src/role/entities/role.entity';
import { UserProfile } from 'src/user_profile/entities/user_profile.entity';
import { ServiceType } from 'src/service_types/entities/service_type.entity';
import { PositionLevel } from 'src/position_levels/entities/position_level.entity';
import { UserSessionLog } from 'src/user_session_log/entities/user_session_log.entity';

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

  @Column()
  user_gender: number;

  @Column({ type: 'date' })
  birthdate: Date;

  @ManyToMany(() => Role, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'User_Roles' })
  role: Role[];

  @Column({ type: 'text', unique: true })
  principal_email: string;

  @Column({ type: 'text', nullable: true })
  corporate_email: string;

  @Column({ type: 'bigint', nullable: true })
  corporate_cellphone: number;

  @Column({ type: 'text', nullable: true, unique: true })
  personal_email: string;

  @Column({ type: 'bigint', nullable: true, unique: true })
  personal_cellphone: number;

  @ManyToOne(() => ServiceType, (service_type) => service_type.user)
  @JoinColumn({ name: 'collaborator_service_type', referencedColumnName: 'id' })
  service_type: ServiceType;

  @Column({ nullable: true })
  collaborator_service_type: number;

  @Column({ type: 'text', nullable: true })
  collaborator_immediate_boss: string;

  @Column({ type: 'text', nullable: true })
  collaborator_unit: string;

  @Column({ type: 'text', nullable: true })
  collaborator_service: string;

  @Column({ type: 'text', nullable: true })
  collaborator_position: string;

  @ManyToOne(() => PositionLevel, (position_level) => position_level.user)
  @JoinColumn({
    name: 'collaborator_position_level',
    referencedColumnName: 'id',
  })
  position_level: PositionLevel;

  @Column({ nullable: true })
  collaborator_position_level: number;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  reset_password_token: string;

  @Column({ type: 'timestamp', nullable: true })
  last_password_update: Date;

  @Column({ nullable: true })
  verification_code: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  banned_user_until: Date;

  @OneToOne(() => UserProfile, (user_profile) => user_profile.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user_profile: UserProfile;

  @OneToOne(() => UserSessionLog, (user_session_log) => user_session_log.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user_session_log: UserSessionLog;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
