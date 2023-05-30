import bodyParser from 'body-parser';
import express, { Express} from 'express';
import dotenv from 'dotenv';
import routers from './routers';
import { sq } from './data-access/db';

const app: Express = express();
dotenv.config();
const PORT: string | number = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(...routers);

sq.sync();

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
