import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/utils/enums/roles.enum';

export const ROLES_KEY = [];
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);