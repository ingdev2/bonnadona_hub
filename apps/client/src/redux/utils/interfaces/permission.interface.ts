interface IPermission {
  id: number;
  name: string;
  description: string;
  applications: number[];
  application_modules: number[];
  module_actions: number[];
  selected_applications?: number[];
  selected_modules?: number[];
  selected_actions?: number[];
  errors: string[];
}
