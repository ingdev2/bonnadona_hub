import { Role } from 'src/role/entities/role.entity';
import { UserProfile } from 'src/user_profile/entities/user_profile.entity';

export interface Payload {
  sub: string;
  name: string;
  principal_email: string;
  user_id_type: number;
  id_number: number;
  role: Role[];
  user_profile: UserProfile;
}
