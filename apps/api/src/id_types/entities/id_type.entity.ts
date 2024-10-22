import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { IdTypeEnum } from '../../utils/enums/id_types.enum';

@Entity()
export class IdType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: IdTypeEnum })
  name: IdTypeEnum;

  @OneToMany(() => User, (user) => user.id_type)
  user: User[];
}
