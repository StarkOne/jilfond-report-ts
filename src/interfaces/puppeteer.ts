import { ILinks } from "./base";

interface IPuppeteerLink {
  name: string;
  html: string;
}

interface IPuppeteerFunc {
  getLinkHtml: (date: string) => Promise<IPuppeteerLink>;
  getContent: (links: ILinks) => Array<string>;
}

export { IPuppeteerLink, IPuppeteerFunc };
