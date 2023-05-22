import bodyParser = require('body-parser');
import express from 'express';
import { sq } from './data-access/db';
import dotenv from 'dotenv';
import routers from './routers/';

const app: Express = express();
dotenv.config();
const PORT: string | number = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(...routers);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
