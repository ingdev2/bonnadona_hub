import { IRole } from 'src/utils/interfaces/role.interface';

export interface Payload {
  id: string;
  name: string;
  principal_email: string;
  user_id_type: number;
  id_number: number;
  role?: IRole[];
  permission?: IPermissions[];
}
