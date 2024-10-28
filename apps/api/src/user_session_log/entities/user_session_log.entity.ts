import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class UserSessionLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', nullable: true, default: '0' })
  successful_login_counter: number;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @Column({ type: 'bigint', nullable: true, default: '0' })
  failed_login_attempts_counter: number;

  @OneToOne(() => User, (user) => user.user_session_log, {
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
