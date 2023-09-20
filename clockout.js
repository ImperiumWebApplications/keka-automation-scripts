const puppeteer = require("puppeteer");

const run = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    userDataDir: "/Users/imperium/Documents/my_chrome_data",
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
};

run().catch(console.error);
