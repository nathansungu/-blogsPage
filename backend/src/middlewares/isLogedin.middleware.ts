import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY = "99c56018836cc95c7e6e14b8a1e5347a83e7b316a201e6dae7613a5a04a03a";

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(403).send('Forbiden action. Login to proceed');
 }
};
