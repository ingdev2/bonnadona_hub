interface AdminLogin {
  id: string;
  name: string;
  last_name: string;
  user_id_type: number;
  id_number: number;
  principal_email: string;
  password: string;
  verification_code: number;
  idTypeOptions: [];
  errors: [];
}
