const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const userDataDirPath = "/Users/imperium/Documents/my_chrome_data";
const maxRetries = 1; // You can adjust the number of retries

(async () => {
  let context;
  let page;
  let retries = 0;

  try {
    context = await chromium.launchPersistentContext(userDataDirPath, {
      headless: true,
    });
    page = await context.newPage();

    await performClockIn();
  } catch (error) {
    console.error(new Date().toISOString(), ":", "An error occurred:", error);

    if (retries < maxRetries) {
      retries++;
      console.log("Attempting to retry...");
      await page.reload({ waitUntil: "domcontentloaded" });
      try {
        await performClockIn();
      } catch (retryError) {
        console.error("Retry also failed:", retryError);
        await handleError();
      }
    } else {
      await handleError();
    }
  }

  async function performClockIn() {
    await page.goto("https://ibexlabs.keka.com/#/home/dashboard");
    await page.waitForTimeout(20000);

    await clickButton("Web Clock-In");
    await page.waitForSelector("text=Confirm", { timeout: 5000 });

    await clickButton("Confirm");
    await page.waitForTimeout(5000);

    await context.close();
  }

  async function clickButton(text) {
    const button = await page.evaluateHandle((text) => {
      const buttons = Array.from(document.querySelectorAll("button"));
      return buttons.find((button) => button.textContent.includes(text));
    }, text);

    if (button) {
      await button.click();
    } else {
      console.log(`Button with text "${text}" not found`);
    }
  }

  async function handleError() {
    if (page) {
      const screenshotsDir = path.join(__dirname, "screenshots");
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }

      const screenshotPath = path.join(
        screenshotsDir,
        `clockin-screenshot-${new Date().toISOString()}.png`
      );

      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot taken: ${screenshotPath}`);
    }
    if (context) {
      await context.close();
    }
  }
})();
