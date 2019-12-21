import { ILinks } from "../interfaces/base";
import { ITast } from "../interfaces/tasks";
import { IPuppeteerLink } from "../interfaces/puppeteer";
const cheerio = require("cheerio");
const fs = require("fs");

const parseLink = (html: IPuppeteerLink, dateMonth: string): ILinks => {
  const $ = cheerio.load(html.html);

  const implemented: string = $(`div:contains("Внедрено ${dateMonth}")`)
    .closest("a")
    .attr("href");
  const workedOut: string = $(`div:contains("Отработано ${dateMonth}")`)
    .closest("a")
    .attr("href");

  return {
    implemented,
    workedOut
  };
};

const parsingData = (
  name: string,
  content: string,
  implemented: boolean = false
): Array<ITast> => {
  const implementedData: Array<ITast> = [];
  const $ = cheerio.load(content);
  const items: any = $(`a:contains(${name})`)
    .closest('tbody[class="yt-table__group"]')
    .find(".yt-table__row");
  items.each(function(index) {
    let task: ITast = {
      number: null,
      title: null,
      timeSpent: {
        hours: null,
        minutes: null
      }
    };
    task.number = $(this)
      .find(".yt-table__cell a.ring-link")
      .text();
    task.title = $(this)
      .find('[rg-tooltip="line.description"]')
      .text();
    task.timeSpent.hours = parseInt(
      $(this)
        .find(
          `${
            index == 0
              ? '[value-presentation="group.duration"] .yt-period-value_hours'
              : '[value-presentation="line.periods.spentTime"] .yt-period-value_hours'
          }`
        )
        .text() || 0
    );
    task.timeSpent.minutes = parseInt(
      $(this)
        .find(
          `${
            index == 0
              ? '[value-presentation="group.duration"] .yt-period-value_minutes'
              : '[value-presentation="line.periods.spentTime"] .yt-period-value_minutes'
          }`
        )
        .text() || 0
    );
    if (implemented) {
      task.estimatedTime = {};
      task.estimatedTime.hours = parseInt(
        $(this)
          .find(
            `${
              index == 0
                ? '[value-presentation="group.estimation"] .yt-period-value_hours'
                : '[value-presentation="line.periods.estimation"] .yt-period-value_hours'
            }`
          )
          .text() || 0
      );
      task.estimatedTime.minutes = parseInt(
        $(this)
          .find(
            `${
              index == 0
                ? '[value-presentation="group.estimation"] .yt-period-value_minutes'
                : '[value-presentation="line.periods.estimation"] .yt-period-value_minutes'
            }`
          )
          .text() || 0
      );
    }
    implementedData.push(task);
  });
  return implementedData;
};

module.exports = {
  parseLink,
  parsingData
};
