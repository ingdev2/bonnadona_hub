import { IApplication } from './application.interface';
import { IApplicationModule } from './application_module.interface';
import { IModuleAction } from './module_action.interface';

export interface IPermissions {
  id: string;
  name: string;
  description?: string;
  applications: IApplication[];
  application_modules: IApplicationModule[];
  module_actions: IModuleAction[];
}
