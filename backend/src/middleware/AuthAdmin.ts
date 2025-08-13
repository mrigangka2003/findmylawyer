import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } from '../constants';

//admin authentication

const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminToken = req.headers.admintoken as string;

        if (!adminToken) {
            return res.json({
                success: false,
                message: "Not Authorized login again"
            });
        }

        const decode = jwt.verify(adminToken, JWT_SECRET);

        if (decode !== ADMIN_EMAIL + ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: "Not Authorized login again"
            });
        }

        next();

    } catch (error: any) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export default authAdmin;