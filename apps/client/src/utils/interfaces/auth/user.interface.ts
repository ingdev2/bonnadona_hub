import { IRole } from "./role.interface";

export interface IUserSession {
  id: string;
  name: string;
  principal_email: string;
  user_id_type: number;
  id_number: number;
  role: IRole[];
  permission: IPermissions[];
}
