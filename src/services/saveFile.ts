import * as moment from "moment";
import { ITast } from "../interfaces/tasks";
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
moment.locale("ru");
const directory = path.join(__dirname, "..", "..", "reports");
let date: string = "";
let title: string = "";

const createReport = (
  workedOutTasks: Array<ITast>,
  implementedTasks: Array<ITast>,
  month: string
): void => {
  createCurrentDate(month);
  const pathReports = path.join(directory, `${title}.txt`);
  let report = "";
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  report += `<b>Затрачено время по задачам за ${date}</b>\n`;
  report += "<pre>\n";
  report = formationText(report, workedOutTasks);
  report += "</pre>";
  report += `\n${"Внедрено в " + date}\n`;
  report += "<pre>\n";
  report = formationText(report, implementedTasks);
  report += "</pre>";

  fs.writeFile(pathReports, report, err => {
    if (err) throw err;
    console.log(chalk.green(`Отчёт за ${date} успешно создан`));
  });
};

const formationText = (text: string, list: Array<ITast>): string => {
  let str = text;
  list.map(task => {
    str += task.format + "\n";
  });
  return str;
};

const createCurrentDate = (str: string): void => {
  if (str) {
    date = moment(str).format("MMMM - GGGG");
    title = moment(str).format("MMMM-GGGG");
  } else {
    date = moment().format("MMMM - GGGG");
    title = moment().format("MMMM-GGGG");
  }
};

module.exports = {
  createReport
};
