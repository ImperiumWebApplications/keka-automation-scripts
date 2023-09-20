const puppeteer = require("puppeteer");

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
        if (button.textContent === "Clock-out") {
          button.click();
          break;
        }
      }
    });

    await page.waitForTimeout(10000);

    await page.evaluate(() => {
      const buttons = document.querySelectorAll("button");
      for (let button of buttons) {
        if (button.textContent === "Clock-out") {
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

    await browser.close();
  } catch (error) {
    console.log(`Error occured within clockout script ${error}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

run().catch(console.error);
