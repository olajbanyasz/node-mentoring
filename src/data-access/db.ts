import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dialect: Dialect = process.env.DB_DIALECT as Dialect;
const port = Number(process.env.DB_PORT);

export const sq : Sequelize = new Sequelize(
    process.env.DATABASE as string,
    process.env.DB_USER_NAME as string,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: dialect,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        port: port
    },
);
