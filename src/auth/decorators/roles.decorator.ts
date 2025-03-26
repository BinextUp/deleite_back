import { SetMetadata } from '@nestjs/common';
import { Rol } from '../../utils/enums/rol.enum';

export const ROLES_KEY = 'roles_app';
export const Roles = (role: Rol) => SetMetadata(ROLES_KEY, role);
