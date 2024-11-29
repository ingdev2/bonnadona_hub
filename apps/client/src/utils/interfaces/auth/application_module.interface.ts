import { IApplication } from './application.interface';
import { IModuleAction } from './module_action.interface';

export interface IApplicationModule {
  id: number;
  name: string;
  application: IApplication;
  app_id: number;
  module_action: IModuleAction[];
}
