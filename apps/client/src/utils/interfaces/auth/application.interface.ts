interface IApplication {
  id: number;
  name: string;
  image_path: string;
  entry_link: string;
  is_active: boolean;
  application_module: IApplicationModule[];
}
