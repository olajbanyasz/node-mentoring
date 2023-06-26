import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

const getLevel = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDev = env === 'development';
    return isDev ? 'debug' : 'warn';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'white',
    silly: 'bold white redBG'
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    winston.format.printf((info: Record<string, any>) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
    new winston.transports.Console({ level: 'http' }),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    })
];

const logger = winston.createLogger({
    level: getLevel(),
    levels,
    format,
    transports
});

export default logger;
