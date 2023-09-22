const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const run = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      userDataDir: "/home/ubuntu/my_chrome_data",
    });
    const page = await browser.newPage();
    await page.goto("https://ibexlabs.keka.com/");

    await page.waitForTimeout(20000);

    await page.evaluate(() => {
      const buttons = document.querySelectorAll("button");
      for (let button of buttons) {
        if (button.textContent === "Web Clock-In") {
          button.click();
          break;
        }
      }
    });

    await page.waitForTimeout(10000);

    await page.evaluate(() => {
      const buttons = document.querySelectorAll("button");
      for (let button of buttons) {
        if (button.textContent === "Confirm") {
          button.click();
          break;
        }
      }
    });

    await page.waitForTimeout(10000);
  } catch (error) {
    console.log(`Error occured within clockin script ${error}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

run();
