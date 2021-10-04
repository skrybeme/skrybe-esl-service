import { EOL } from 'common/utils';
import { LogData, LogType } from './types';

export interface ILoggerOutput {
  flush(compactMessage: string, logData: LogData): void;
}

export interface LoggerProps {
  output: ILoggerOutput[];
}

export class Logger {
  constructor(private _props: LoggerProps) {}

  private makeCompactMessage(logData: LogData): string {
    return `[${logData.type}] ${logData.date.toUTCString()} ${logData.namespace ? `${logData.namespace}: ` : ' '}${logData.message}${EOL}`;
  }

  error(message: string, namespace?: string) {
    const logDdata = {
      date: new Date(),
      message,
      namespace,
      type: LogType.ERR,
    };

    this._props.output.forEach((output) => {
      output.flush(this.makeCompactMessage(logDdata), logDdata);
    });
  }

  log(message: string, namespace?: string) {
    const logDdata = {
      date: new Date(),
      message,
      namespace,
      type: LogType.DEB,
    };

    this._props.output.forEach((output) => {
      output.flush(this.makeCompactMessage(logDdata), logDdata);
    });
  }

  warning(message: string, namespace?: string) {
    const logDdata = {
      date: new Date(),
      message,
      namespace,
      type: LogType.WRN,
    };

    this._props.output.forEach((output) => {
      output.flush(this.makeCompactMessage(logDdata), logDdata);
    });
  }
}
