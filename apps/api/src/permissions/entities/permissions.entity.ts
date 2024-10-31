import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Application, (application) => application.permissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'app_id', referencedColumnName: 'id' })
  application: Application;

  @Column()
  app_id: number;

  @ManyToOne(
    () => ApplicationModule,
    (application_module) => application_module.permissions,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'app_module_id', referencedColumnName: 'id' })
  application_module: ApplicationModule;

  @Column()
  app_module_id: number;

  @ManyToOne(() => ModuleAction, (module_action) => module_action.permissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'module_action_id', referencedColumnName: 'id' })
  module_action: ModuleAction;

  @Column()
  module_action_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
