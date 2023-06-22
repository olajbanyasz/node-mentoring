import express, { Request, Response, Router } from 'express';
const homeRouter: Router = express.Router();

homeRouter.get('/', (req: Request, res: Response) => {
  res.send('<h1>Home page</h1><h1><a href="/users">Users</a></h1><h1><a href="/groups">Groups</a></h1>');
});

export default homeRouter;
