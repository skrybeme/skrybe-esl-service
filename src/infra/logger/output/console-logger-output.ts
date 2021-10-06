import { ILoggerOutput } from '../logger';
import { LogData, LogType } from '../types';

export class ConsoleLoggerOutput implements ILoggerOutput {
  constructor() {}

  flush(compactMessage: string, { type }: LogData): void {
    switch (type) {
      case LogType.DEB: {
        console.log(compactMessage);

        return;
      }
      case LogType.ERR: {
        console.error(compactMessage);

        return;
      }
      case LogType.WRN: {
        console.warn(compactMessage);
      }
    }
  }
}
