interface IApplication {
  id: number;
  name: string;
  image_path: string;
  entry_link: string;
  application_module: IApplicationModule[];
  is_active: boolean;
  errors: string[];
}
