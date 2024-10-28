import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: RolesEnum })
  name: RolesEnum;
}
