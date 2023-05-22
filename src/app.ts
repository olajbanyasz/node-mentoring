import bodyParser = require('body-parser');
import routers from './routers/';
import express, { Express } from 'express';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(...routers);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
