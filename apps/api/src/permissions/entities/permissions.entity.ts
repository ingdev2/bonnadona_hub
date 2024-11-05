import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from 'src/application/entities/application.entity';
import { ApplicationModule } from 'src/application_module/entities/application_module.entity';
import { ModuleAction } from 'src/module_action/entities/module_action.entity';

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => Application, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'Permissions_Applications' })
  applications: Application[];

  @ManyToMany(() => ApplicationModule, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'Permissions_AppModules' })
  application_modules: ApplicationModule[];

  @ManyToMany(() => ModuleAction, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'Permissions_ModuleActions' })
  module_actions: ModuleAction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
