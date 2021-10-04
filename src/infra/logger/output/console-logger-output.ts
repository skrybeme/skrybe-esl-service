import { ILoggerOutput } from '../logger';
import { LogData, LogType } from '../types';

export class ConsoleLoggerOutput implements ILoggerOutput {
  constructor() {}

  flush(compactMessage: string, { type }: LogData): void {
    switch (type) {
      case LogType.DEB: {
        console.log(compactMessage);
      }
      case LogType.ERR: {
        console.error(compactMessage);
      }
      case LogType.WRN: {
        console.warn(compactMessage);
      }
    }
  }
}
