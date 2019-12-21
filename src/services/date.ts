const { Select } = require("enquirer");
import * as moment from "moment";
moment.locale("ru");
let promptSelect = new Select({
  name: "Отчёт",
  message: "Выберите месяц за который вам нужно получить отчёт?",
  choices: [...moment.months()]
});

module.exports = promptSelect;
