interface IPermissions {
  id: string;
  name: string;
  description?: string;
  applications: IApplication[];
  application_modules: IApplicationModule[];
  module_actions: IModuleAction[];
}
