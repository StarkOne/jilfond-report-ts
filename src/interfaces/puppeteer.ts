import { ILinks } from "./base";

interface IPuppeteerLink {
  name: string;
  html: string;
}

interface IPuppeteerFunc {
  getLinkHtml: () => Promise<IPuppeteerLink>;
  getContent: (links: ILinks) => Array<string>;
}

export { IPuppeteerLink, IPuppeteerFunc };
