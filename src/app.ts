import { IConfig, ILinks } from "./interfaces/base";
import { IPuppeteerLink, IPuppeteerFunc } from "./interfaces/puppeteer";
import { ICheerioFunc } from "./interfaces/cheerio";
import { ITast } from "./interfaces/tasks";
const config: IConfig = require("dotenv").config().parsed;
const puppeteerFunc: IPuppeteerFunc = require("./services/puppeteer");
const cheerioFunc: ICheerioFunc = require("./services/cheerio");
const helpers = require("./services/helpers");
const createReport = require("./services/saveFile");
const prompt = require("./services/date");
const Spinner = require("cli-spinner").Spinner;
const moment = require("moment");
const sp = new Spinner();
sp.setSpinnerString(18);
moment.locale("ru");

prompt
  .run()
  .then(
    async (answer: string): Promise<void> => {
      sp.start();
      const dateMonth: string = moment()
        .month(answer)
        .format("GGGG-MM");
      const html: IPuppeteerLink = await puppeteerFunc.getLinkHtml(config);
      const links: ILinks = await cheerioFunc.parseLink(html, dateMonth);
      helpers.showError(links);
      const content: Promise<Object> = await puppeteerFunc.getContent(links);
      const implemented: Array<ITast> = await cheerioFunc.parsingData(
        html.name,
        content[0],
        true
      );
      const workedOut: Array<ITast> = await cheerioFunc.parsingData(
        html.name,
        content[1]
      );
      const implementedTasks: Array<ITast> = helpers.preparationData(
        implemented,
        true
      );
      const workedOutTasks: Array<ITast> = helpers.preparationData(workedOut);
      createReport.createReport(workedOutTasks, implementedTasks, dateMonth);
      sp.stop();
    }
  )
  .catch(console.error);
