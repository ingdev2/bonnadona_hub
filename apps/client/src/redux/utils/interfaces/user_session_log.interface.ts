interface UserSessionLog {
  id: string;
  successful_login_counter: number;
  last_login: string;
  failed_login_attempts_counter: number;
  number_of_user_bans: number;
  createdAt: string;
  updateAt: string;
  deletedAt: null;
  errors: [];
}
