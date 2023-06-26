import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from './logger';

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (!error) {
        return next();
    }
    logger.error(error.message);
    response.send(StatusCodes.INTERNAL_SERVER_ERROR);
};

export default errorHandler;