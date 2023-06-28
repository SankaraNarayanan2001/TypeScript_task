import jwt, { JwtPayload } from 'jsonwebtoken';
import {Request,Response,NextFunction } from 'express';
import AppError from '../utils/appError';

declare module "express" {
  interface Request {
      id?: number;
  }
}
export const validation = (req:Request, res:Response, next:NextFunction) => {
  const token: string | undefined = req.header('token');

  if (!token) {
    throw new AppError(400, 'Invalid Token');
  }

  try {
    const decoded: JwtPayload = jwt.verify(token, 'key') as JwtPayload;
    req.id=decoded.id;
    next();
  } catch (error) {
    throw new AppError(403, 'Access Denied');
  }
};
