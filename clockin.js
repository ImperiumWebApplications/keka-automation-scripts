const { chromium } = require("playwright");

const userDataDirPath = "/home/ubuntu/my_chrome_data";
let browser;

(async () => {
  try {
    browser = await chromium.launch({
      headless: false, // Changed 'new' to false to disable headless mode
      userDataDir: userDataDirPath,
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://ibexlabs.keka.com/#/home/dashboard");

    await page.waitForTimeout(20000); // Replaced the Promise + setTimeout with waitForTimeout

    let buttons = await page.$$("text=Web Clock-In"); // Replaced the XPath selector with a text selector
    if (buttons.length > 0) {
      await buttons[0].click();
    } else {
      console.log("Button not found");
    }

    await page.waitForTimeout(5000);

    buttons = await page.$$("text=Confirm"); // Replaced the XPath selector with a text selector
    if (buttons.length > 0) {
      await buttons[0].click();
    } else {
      console.log("Button not found");
    }

    await page.waitForTimeout(5000);

    await browser.close();
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error("An error occurred:", error);
  }
})();
