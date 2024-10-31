import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { ApplicationModule } from 'src/application_module/entities/application_module.entity';

@Entity()
export class ModuleAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @OneToMany(() => Permissions, (permissions) => permissions.module_action, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  permissions: Permissions[];

  @ManyToOne(
    () => ApplicationModule,
    (application_module) => application_module.module_action,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'app_module_id', referencedColumnName: 'id' })
  application_module: ApplicationModule;

  @Column()
  app_module_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
