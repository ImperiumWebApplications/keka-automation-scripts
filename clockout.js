const { chromium } = require("playwright");

const userDataDirPath = "/Users/imperium/Documents/my_chrome_data";
const maxRetries = 3;

async function runClockOutScript(retryCount = 0) {
  let context;
  try {
    context = await chromium.launchPersistentContext(userDataDirPath, {
      headless: true,
    });
    const page = await context.newPage();

    await page.goto("https://ibexlabs.keka.com/#/home/dashboard");
    await page.waitForTimeout(20000); // Wait for page to load

    async function clickButton(text) {
      const button = await page.evaluateHandle((text) => {
        const buttons = Array.from(document.querySelectorAll("button"));
        return buttons.find((button) => button.textContent.includes(text));
      }, text);

      if (button && typeof button.click === "function") {
        await button.click();
      } else {
        console.log(`Button with text "${text}" not found or not clickable`);
      }
    }

    await clickButton("Clock-out");
    await page.waitForSelector("text=Clock-out", { timeout: 5000 });

    await clickButton("Clock-out");
    await page.waitForSelector("text=Confirm", { timeout: 5000 });

    await clickButton("Confirm");

    await page.waitForTimeout(5000);
    await context.close();
  } catch (error) {
    console.error("An error occurred:", error);
    if (retryCount < maxRetries) {
      console.log(`Retrying... Attempt ${retryCount + 1}`);
      await runClockOutScript(retryCount + 1);
    }
  } finally {
    if (context) {
      await context.close();
    }
  }
}

runClockOutScript();
