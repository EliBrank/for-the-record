import winston, { format, transports } from 'winston';

const logger = winston.createLogger({
  level: 'debug',
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/debug.log',
    }),
  ],
});

export default logger;
