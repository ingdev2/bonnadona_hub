import { Role } from 'src/role/entities/role.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';

export interface Payload {
  sub: string;
  name: string;
  principal_email: string;
  user_id_type: number;
  id_number: number;
  role: Role[];
  permissions: Permissions[];
}
