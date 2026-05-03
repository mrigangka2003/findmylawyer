import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { Role } from '../models/role.model';

export const checkPermission = (permission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // In a more complex system, you might cache these mappings
      const role = await Role.findOne({ name: req.user.role });

      if (!role) {
        return res.status(403).json({ message: 'Role not found' });
      }

      if (req.user.role === 'admin'){
          return next(); // Admins have all permissions
      }

      if (role.permissions.includes(permission)) {
        return next();
      }

      return res.status(403).json({ message: 'Forbidden: You do not have the required permission' });
    } catch (error: any) {
      res.status(500).json({ message: 'RBAC Check Error', error: error.message });
    }
  };
};
