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
import { BloodGroup } from 'src/blood_groups/entities/blood_group.entity';
import { Role } from 'src/role/entities/role.entity';
import { UserProfile } from 'src/user_profile/entities/user_profile.entity';
import { ServiceType } from 'src/service_types/entities/service_type.entity';

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

  @Column({ type: 'text', nullable: true })
  corporate_email: string;

  @Column({ type: 'bigint', nullable: true })
  corporate_cellphone: number;

  @ManyToOne(() => ServiceType, (service_type) => service_type.user)
  @JoinColumn({ name: 'collaborator_service_type', referencedColumnName: 'id' })
  service_type: ServiceType;

  @Column({ type: 'text' })
  collaborator_service_type: number;

  @Column({ type: 'text', nullable: true })
  collaborator_immediate_boss: string;

  @Column({ type: 'text', nullable: true })
  collaborator_unit: string;

  @Column({ type: 'text', nullable: true })
  collaborator_service: string;

  @Column({ type: 'text', nullable: true })
  collaborator_position: string;

  @Column({ type: 'text', nullable: true })
  collaborator_position_level: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  reset_password_token: string;

  @Column({ nullable: true })
  authentication_method: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToOne(() => UserProfile, (user_profile) => user_profile.user)
  @JoinColumn()
  user_profile: UserProfile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
