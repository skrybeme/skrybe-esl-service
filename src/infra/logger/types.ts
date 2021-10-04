export enum LogType {
  DEB = 'DEB',
  ERR = 'ERR',
  WRN = 'WRN'
}

export type LogData = {
  date: Date;
  message: string;
  namespace?: string;
  type: LogType;
}
