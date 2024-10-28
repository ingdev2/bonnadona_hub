import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { GenderTypeEnums } from 'src/utils/enums/gender_types.enum';

@Entity()
export class GenderType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: GenderTypeEnums })
  name: GenderTypeEnums;

  @OneToMany(() => User, (user) => user.gender)
  user: User[];
}
