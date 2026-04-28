import { Router } from 'express';
import { getAllUsers, deleteUser } from '../controllers/admin.controller';
import { verifyToken, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(verifyToken, authorize(['admin']));

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

export default router;
