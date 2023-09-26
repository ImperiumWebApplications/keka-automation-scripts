const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const userDataDir = "/home/ubuntu/my_chrome_data";
const singletonLockFile = path.join(userDataDir, "SingletonLock");

if (fs.existsSync(singletonLockFile)) {
  fs.unlinkSync(singletonLockFile);
}

const run = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      userDataDir,
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
      try {
        await browser.close();
      } catch (closeError) {
        console.log(
          `An error occurred while closing the browser: ${closeError}`
        );
      }
    }
  }
};

run();
