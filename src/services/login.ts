const puppeteer = require('puppeteer');
import { Browser, Page } from 'puppeteer';

const login = async ({ LOGIN, PASSWORD, URL_YTR }) => {
  const browser: Browser = await puppeteer.launch({ headless: true });
  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 2500 });
  await page.goto(URL_YTR, {
    waitUntil: 'networkidle0',
  });
  await page.type('#username', LOGIN);
  await page.type('#password', PASSWORD);
  await page.click('[type="submit"]'),
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
  return {
    page,
    browser,
  };
};
module.exports = login;
