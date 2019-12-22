import { ITast } from "./tasks";
import { ILinks } from "./base";
import { IPuppeteerLink } from "./puppeteer";

interface ICheerioFunc {
  parseLink: (html: IPuppeteerLink, dateMonth: string) => ILinks;
  parsingData: (
    name: string,
    content: string,
    implemented?: boolean
  ) => Array<ITast>;
}
export { ICheerioFunc };
