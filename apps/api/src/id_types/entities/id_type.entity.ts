import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IdType } from '../../utils/enums/id_types.enum';

@Entity()
export class IdTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: IdType })
  name: IdType;

  @OneToMany(() => User, (user) => user.id_type)
  user: User[];
}
