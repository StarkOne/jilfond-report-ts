import { IConfig, ILinks } from "../interfaces/base";
import { IPuppeteerLink } from "../interfaces/puppeteer";
const login = require("./login");
const config: IConfig = require("dotenv").config().parsed;

const getLinkHtml = async (): Promise<IPuppeteerLink> => {
  const loginData = await login(config);
  const element = await loginData.page.$(
    '[data-test="ring-dropdown ring-profile"]'
  );
  const name: string = await loginData.page.evaluate(
    (element) => element.getAttribute("title"),
    element
  );
  await loginData.page.goto("http://ytr.jilfond.org:8943/reports", {
    waitUntil: "networkidle0",
  });
  await loginData.page.waitFor(1000);
  await loginData.page.click(
    '[data-test="sharedReports"] [title="Показать больше"]'
  );
  const html = await loginData.page.$eval(".list_735", (element) => {
    return element.innerHTML;
  });

  await loginData.browser.close();

  return {
    name,
    html,
  };
};

const getContent = async (links: ILinks): Promise<Object> => {
  const data: string[] = [];
  const loginData = await login(config);
  for (let link in links) {
    await loginData.page.goto(`http://ytr.jilfond.org:8943/${links[link]}`, {
      waitUntil: "networkidle0",
    });
    let content: string = await loginData.page.evaluate(
      () => document.body.innerHTML
    );
    data.push(content);
  }

  await loginData.browser.close();

  return data;
};

module.exports = {
  getLinkHtml,
  getContent,
};
