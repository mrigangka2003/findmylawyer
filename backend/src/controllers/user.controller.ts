import { AuthRequest } from '../middlewares/auth.middleware';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json({ message: 'User profile fetched', user: req.user });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message || error });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json({ message: 'User profile updated' });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message || error });
  }
};
