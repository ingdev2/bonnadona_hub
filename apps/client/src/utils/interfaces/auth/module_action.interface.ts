import { IApplicationModule } from './application_module.interface';

export interface IModuleAction {
  id: number;
  name: string;
  application_module: IApplicationModule;
  app_module_id: number;
}
