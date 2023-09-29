const { chromium } = require("playwright");

const userDataDirPath = "/home/ubuntu/my_chrome_data";

(async () => {
  let browser;
  let context;
  try {
    context = await chromium.launchPersistentContext(userDataDirPath, {
      headless: true,
    });
    browser = context.browser();
    const page = await context.newPage();

    await page.goto("https://ibexlabs.keka.com/#/home/dashboard");

    await page.waitForTimeout(20000); // Replaced the Promise + setTimeout with waitForTimeout

    let buttons = await page.$$("text=Clock-out"); // Replaced the XPath selector with a text selector
    if (buttons.length > 0) {
      await buttons[0].click();
    } else {
      console.log("Button not found");
    }

    await page.waitForTimeout(5000);

    buttons = await page.$$("text=Clock-out"); // Replaced the XPath selector with a text selector
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
