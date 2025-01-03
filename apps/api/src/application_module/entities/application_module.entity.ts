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
import { Application } from 'src/application/entities/application.entity';
import { ModuleAction } from 'src/module_action/entities/module_action.entity';

@Entity()
export class ApplicationModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @ManyToOne(
    () => Application,
    (application) => application.application_module,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'app_id', referencedColumnName: 'id' })
  application: Application;

  @Column()
  app_id: number;

  @OneToMany(
    () => ModuleAction,
    (module_action) => module_action.application_module,
  )
  module_action: ModuleAction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
