const puppeteer = require("puppeteer");
import { Browser, Page } from "puppeteer";

const login = async ({ LOGIN, PASSWORD }) => {
  const browser: Browser = await puppeteer.launch({ headless: true });
  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 2500 });
  await page.goto("http://ytr.jilfond.org:8943/hub/auth/login", {
    waitUntil: "networkidle0"
  });
  await page.type("#username", LOGIN);
  await page.type("#password", PASSWORD);
  await page.click('[type="submit"]'),
    await page.waitForNavigation({ waitUntil: "networkidle0" });
  return {
    page,
    browser
  };
};
module.exports = login;
