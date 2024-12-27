import { IRole } from "./role.interface";

export interface IUserSession {
  id: string;
  name: string;
  user_id_type: number;
  id_number: number;
  email: string;
  role: IRole[];
}
