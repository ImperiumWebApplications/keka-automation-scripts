const { chromium } = require("playwright");

const userDataDirPath = "/Users/imperium/Documents/my_chrome_data";

(async () => {
  let context;
  let page;
  try {
    context = await chromium.launchPersistentContext(userDataDirPath, {
      headless: true,
    });
    page = await context.newPage();

    await page.goto("https://ibexlabs.keka.com/#/home/dashboard");

    await page.waitForTimeout(20000); // Wait for page to load

    // Function to find and click a button based on its text content
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

    await clickButton("Clock-out"); // Click the first Clock-out button
    await page.waitForSelector("text=Clock-out", { timeout: 5000 }); // Wait for a certain element or text to appear

    await clickButton("Clock-out"); // Click the second Clock-out button
    await page.waitForSelector("text=Confirm", { timeout: 5000 }); // Wait for a certain element or text to appear

    await clickButton("Confirm"); // Click the Confirm button

    await page.waitForTimeout(5000);

    await context.close();
  } catch (error) {
    console.error("An error occurred:", error);
    if (page) {
      // Specify the path where you want to save the screenshot
      const screenshotPath = "screenshots/screenshot.png";

      // Take a screenshot of the current page state
      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot taken: ${screenshotPath}`);
    }
    if (context) {
      await context.close();
    }
  }
})();
