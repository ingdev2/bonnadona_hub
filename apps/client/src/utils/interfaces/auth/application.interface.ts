import { IApplicationModule } from './application_module.interface';

export interface IApplication {
  id: number;
  name: string;
  application_module: IApplicationModule[];
}
