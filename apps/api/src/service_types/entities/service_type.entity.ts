import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceTypesEnum } from 'src/utils/enums/service_types.enum';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class ServiceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: ServiceTypesEnum })
  name: ServiceTypesEnum;

  @OneToMany(() => User, (user) => user.service_type)
  user: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
