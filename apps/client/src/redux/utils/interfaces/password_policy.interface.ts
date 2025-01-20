interface PasswordPolicy {
  id: number;
  min_length: number;
  require_uppercase: boolean;
  require_lowercase: boolean;
  require_numbers: boolean;
  require_special_characters: boolean;
  password_expiry_days: number;
  inactivity_days: number;
  password_history_limit: number;
  maximum_minutes_of_inactivity_in_application: number;
  errors: [];
}
