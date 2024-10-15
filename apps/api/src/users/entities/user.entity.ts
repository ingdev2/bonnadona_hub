import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IdTypeEntity } from 'src/id_types/entities/id_type.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  last_name: string;

  @ManyToOne(() => IdTypeEntity, (id_type) => id_type.user)
  @JoinColumn({ name: 'user_id_type', referencedColumnName: 'id' })
  id_type: IdTypeEntity;

  @Column()
  user_id_type: number;

  @Column({ type: 'bigint', unique: true })
  id_number: number;

  // @ManyToOne(() => GenderType, (gender) => gender.user)
  // @JoinColumn({ name: 'user_gender', referencedColumnName: 'id' })
  // gender: GenderType;

  // @Column()
  // user_gender: number;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'bigint', nullable: true })
  cellphone: number;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  residence_department: string;

  @Column({ nullable: true })
  residence_city: string;

  @Column({ nullable: true })
  residence_address: string;

  @Column({ nullable: true })
  residence_neighborhood: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
