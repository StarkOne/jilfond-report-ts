import { IConfig, ILinks } from "../interfaces/base";
import { ITast, IAllTime } from "../interfaces/tasks";
const config: IConfig = require("dotenv").config().parsed;
const fs = require("fs");
let allMoney: number = 0;
const allTime: IAllTime = {
  hours: 0,
  minutes: 0
};

const preparationData = (
  data: Array<ITast>,
  implemented: boolean = false
): Array<ITast> => {
  const firstElement = data.shift();

  data.push({
    number: "Итого",
    title: "",
    timeSpent: {
      hours: firstElement.timeSpent.hours,
      minutes: firstElement.timeSpent.minutes
    },
    estimatedTime: {
      hours: implemented ? firstElement.estimatedTime.hours : 0,
      minutes: implemented ? firstElement.estimatedTime.minutes : 0
    }
  });

  const maxLengthTitle = determineMaxlength(data, createTitle);
  const maxLengthTime = determineMaxlength(data, createTime, implemented);

  data.map(task => {
    task.format = createDots(maxLengthTitle, task);
    task.format = time(maxLengthTime, task, implemented);
    if (implemented) {
      task.format = money(task);
    }
    return task;
  });
  return data;
};

const createTitle = ({ number, title }): string => {
  return `${number}: ${title}`;
};

const createDots = (num: number, task: ITast): string => {
  let title = createTitle(task);
  return `${title} ${new Array(num - title.length + 5).join(".")}`;
};

const createTime = (task: ITast, implemented: boolean): string => {
  let target = implemented ? "estimatedTime" : "timeSpent";
  if (task.format) countAllTime(task[target].hours, task[target].minutes);
  return `${task[target].hours ? task[target].hours + "ч" : ""}${
    task[target].minutes ? task[target].minutes + "м" : ""
  }`;
};

const time = (num: number, task: ITast, implemented: boolean): string => {
  const time = createTime(task, implemented);
  return `${task.format} ${time} ${
    implemented ? new Array(num - time.length + 10).join(".") : ""
  }`;
};

const money = (task: ITast): string => {
  return `${task.format} ${countMoney(task, config.PAYMENT_PER_HOUR)}р;`;
};

const countMoney = (task, payment_per_hour) => {
  const timeForTask =
    task.estimatedTime.hours * 60 + task.estimatedTime.minutes;
  const money = (timeForTask * (payment_per_hour / 60) * 1.3).toFixed(0);
  countAllMoney(money);
  return money;
};

const determineMaxlength = (
  data: Array<ITast>,
  cb: Function,
  implemented: boolean = false
): number => {
  const list = [];
  data.map(task => {
    list.push(cb(task, implemented));
  });

  return list.reduce(function(a, b) {
    return a.length > b.length ? a : b;
  }).length;
};

const countAllTime = (hours: number, minutes: number): void => {
  allTime.hours += hours || 0;
  allTime.minutes += minutes || 0;
};

const countAllMoney = (money: string): void => {
  allMoney += parseInt(money);
};

const showError = (links: ILinks): void => {
  if (!links.implemented) throw "В youtrack нет отчёта по внедрённым часам!";
  if (!links.workedOut) throw "В youtrack нет отчёта по внедрённым часам!";
};

module.exports = {
  preparationData,
  showError
};
