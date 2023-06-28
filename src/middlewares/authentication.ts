import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
const TOKENKEY : string = process.env.TOKEN_KEY || '';

const authMiddleware = (request: Request, response:Response, next: NextFunction) => {
    
    try {
        const token : string | undefined = request.headers['authorization'];

        if (!token) {
            return response.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not authorized' }).send();
        }

        jwt.verify(token, TOKENKEY, (err) => {

            if (err) {
              return response.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not authorized' });
            }
      
            return next();
        })
    } catch (error) {
        logger.error(`${request.method} - ${request.path}: ${error}`);
        response.status(StatusCodes.FORBIDDEN).send();
    }
};

export default authMiddleware;