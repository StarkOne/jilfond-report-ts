import { ITast } from './tasks';

interface IConfig {
  LOGIN: string;
  PASSWORD: string;
  PAYMENT_PER_HOUR: string;
  URL_YTR: string;
}

interface ILinks {
  implemented: string;
  workedOut: string;
}

interface IHelpers {
  preparationData: (data: Array<ITast>, implemented?: boolean) => Array<ITast>;
  showError: (links: ILinks) => void;
}

interface ISaveFile {
  createReport: (
    workedOutTasks: Array<ITast>,
    implementedTasks: Array<ITast>,
    month: string
  ) => void;
}

export { IConfig, ILinks, IHelpers, ISaveFile };
