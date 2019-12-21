interface ITast {
  number: string;
  title: string;
  estimatedTime?: {
    hours?: number;
    minutes?: number;
  };
  timeSpent: {
    hours: number;
    minutes: number;
  };
  format?: string;
}

interface IAllTime {
  hours: number;
  minutes: number;
}

export { ITast, IAllTime };
