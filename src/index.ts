import bodyParser = require('body-parser');
import userRouter from "./routers/user-router";
import homeRouter from './routers/home-router';
import express, { Request, Response, Express } from 'express';

const app : Express = express();
const PORT : string | number = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', homeRouter);
app.use('/users', userRouter);
app.all('*', (req: Request, res: Response) => {
  res.status(404).send('<h1>404! Page not found</h1><a href="/">Home</a>');
});
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
