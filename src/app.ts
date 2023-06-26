import bodyParser from 'body-parser';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import routers from './routers';
import { sq } from './data-access/db';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import morganMiddleware from './middlewares/morganMiddleware';

const app: Express = express();
dotenv.config();
const PORT: string | number = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morganMiddleware);
app.use(...routers);
app.use(errorHandler);

app.listen(PORT, () => {
  sq.sync();
  logger.info(`Server is listening on http://localhost:${PORT}`);
});

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error(`UnhandledRejection at ${promise}, reason: ${reason}`);
  })
  .on('uncaughtException', (error, origin) => {
    logger.error(`UncaughtException: ${error}, origin: ${origin}`);
  });
