import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { ApplicationModule } from 'src/application_module/entities/application_module.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @OneToMany(() => Permissions, (permissions) => permissions.application, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  permissions: Permissions[];

  @OneToMany(
    () => ApplicationModule,
    (application_module) => application_module.application,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  application_module: ApplicationModule[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
