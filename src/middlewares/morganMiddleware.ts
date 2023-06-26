import morgan from "morgan";
import logger from "./logger";
import { Request, Response } from "express";

export const stream = {
    write: (message: string) => logger.http(message)
};

const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const morganMiddleware = morgan((tokens: any, req: Request, res: Response) => {
    return `${tokens.method(req, res)} methhod url: ${tokens.url(req, res)}, request body: ${JSON.stringify(req.body || {})}, response time: ${tokens['response-time'](req, res)} ms`;},
    { stream, skip }
);

export default morganMiddleware;