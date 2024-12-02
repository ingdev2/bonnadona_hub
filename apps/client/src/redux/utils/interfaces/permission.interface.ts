interface IPermission {
  id: number;
  name: string;
  description: string;
  applications: number[];
  application_modules: number[];
  module_actions: number[];
  errors: string[];
}
