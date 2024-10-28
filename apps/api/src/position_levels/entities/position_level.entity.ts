import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}
