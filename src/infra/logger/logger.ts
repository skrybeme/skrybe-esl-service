import { EOL } from '../../common/utils';
import { LogData, LogType } from './types';

export interface ILoggerOutput {
  flush(compactMessage: string, logData: LogData): void;
}

export interface LoggerProps {
  output: ILoggerOutput[];
}

export class Logger {
  constructor(private _props: LoggerProps) {}

  private flush(logData: LogData): void {
    this._props.output.forEach((output) => {
      output.flush(this.makeCompactMessage(logData), logData);
    });
  }

  private makeCompactMessage(logData: LogData): string {
    return `[${logData.date.toUTCString()}] [${logData.type}] ${logData.namespace ? `[${logData.namespace}] ` : ''}[${logData.message}]`;
  }

  error(message: string, namespace?: string) {
    const logDdata = {
      date: new Date(),
      message,
      namespace,
      type: LogType.ERR,
    };

    this.flush(logDdata);
  }

  log(message: string, namespace?: string) {
    const logDdata = {
      date: new Date(),
      message,
      namespace,
      type: LogType.DEB,
    };

    this.flush(logDdata);
  }

  warning(message: string, namespace?: string) {
    const logDdata = {
      date: new Date(),
      message,
      namespace,
      type: LogType.WRN,
    };

    this.flush(logDdata);
  }
}
