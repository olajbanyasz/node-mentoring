import express, { Router, Request, Response } from 'express';
const errorRouter: Router = express.Router();

errorRouter.all('*', (req: Request, res: Response) => {
  res.status(404).send('<h1>404! Page not found</h1><a href="/">Home</a>');
});

export default errorRouter;
