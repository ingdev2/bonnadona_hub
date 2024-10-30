import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PositionLevelEnum } from 'src/utils/enums/position_level.enum';

@Entity()
export class PositionLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: PositionLevelEnum })
  name: PositionLevelEnum;

  @OneToMany(() => User, (user) => user.position_level)
  user: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
