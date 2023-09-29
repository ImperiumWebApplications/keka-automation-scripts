const puppeteer = require("puppeteer");

const userDataDirPath = "/home/ubuntu/my_chrome_data";
let browser;

(async () => {
  try {
    browser = await puppeteer.launch({
      headless: "new",
      userDataDir: userDataDirPath,
    });

    const page = await browser.newPage();
    await page.goto("https://ibexlabs.keka.com/#/home/dashboard");
    await page.setDefaultNavigationTimeout(60000); // Set timeout to 60 seconds

    await page.waitForXPath("//button[contains(text(), 'Web Clock-In')]", {
      timeout: 30000,
    });
    let buttons = await page.$x("//button[contains(text(), 'Web Clock-In')]");
    if (buttons.length > 0) {
      await buttons[0].click();
    } else {
      console.log("Button not found");
    }

    await page.waitForXPath("//button[contains(text(), 'Confirm')]", {
      timeout: 30000,
    });
    buttons = await page.$x("//button[contains(text(), 'Confirm')]");
    if (buttons.length > 0) {
      await buttons[0].click();
    } else {
      console.log("Button not found");
    }

    await browser.close();
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error("An error occurred:", error);
  }
})();
