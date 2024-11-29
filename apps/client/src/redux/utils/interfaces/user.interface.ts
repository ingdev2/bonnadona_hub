interface User {
  id: string;
  name: string;
  last_name: string;
  user_id_type: number;
  id_number: number;
  user_gender: number;
  birthdate: string;
  principal_email: string;
  corporate_email: string;
  corporate_cellphone: number;
  personal_cellphone: number;
  personal_email: string;
  password: string;
  last_password_update: string;
  collaborator_service_type: number;
  collaborator_immediate_boss: string;
  collaborator_unit: string;
  collaborator_service: string;
  collaborator_position: string;
  is_active: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string;
  errors: [];
}
