interface IPuppeteerLink {
  name: string;
  html: string;
}

interface IPuppeteerFunc {
  getLinkHtml: Function;
  getContent: Function;
}

export { IPuppeteerLink, IPuppeteerFunc };
