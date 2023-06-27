import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


interface MyJwtPayload extends JwtPayload {
    id: number;
  }
  
export const validation = (req: MyJwtPayload, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('token');

  if (!token) {
    return res.status(404).json({ message: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, 'key') as MyJwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }
};
