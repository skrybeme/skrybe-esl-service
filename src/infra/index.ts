import { Logger } from './logger/logger';
import { ConsoleLoggerOutput } from './logger/output/console-logger-output';

const logger = new Logger({
  output: [
    new ConsoleLoggerOutput()
  ]
});

export { logger }
