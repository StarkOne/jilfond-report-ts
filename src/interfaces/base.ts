interface IConfig {
  LOGIN: string;
  PASSWORD: string;
  PAYMENT_PER_HOUR: string;
}

interface ILinks {
  implemented: string;
  workedOut: string;
}

interface IHelpers {
  preparationData: Function;
  showError: Function;
}

interface ISaveFile {
  createReport: Function;
}

export { IConfig, ILinks, IHelpers, ISaveFile };
