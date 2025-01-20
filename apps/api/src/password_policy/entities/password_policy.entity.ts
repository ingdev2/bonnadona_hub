import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('password_policy')
export class PasswordPolicy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 8 })
  min_length: number;

  @Column({ type: 'boolean', default: true })
  require_uppercase: boolean;

  @Column({ type: 'boolean', default: true })
  require_lowercase: boolean;

  @Column({ type: 'boolean', default: false })
  require_numbers: boolean;

  @Column({ type: 'boolean', default: false })
  require_special_characters: boolean;

  @Column({ type: 'int', default: 30 })
  password_expiry_days: number;

  @Column({ type: 'int', default: 15 })
  inactivity_days: number;

  @Column({ type: 'int', default: 3 })
  password_history_limit: number;

  @Column({ type: 'int', default: 13 })
  maximum_minutes_of_inactivity_in_application: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
