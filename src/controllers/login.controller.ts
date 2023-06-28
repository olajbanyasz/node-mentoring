import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.service';

const loginService = new LoginService();

export async function login(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const payload: { login: string, password: string } = request.body;
        const result = await loginService.login(payload);
        response.status(StatusCodes.OK).send(result);
    } catch (error) {
        return next(error);
    }
};
