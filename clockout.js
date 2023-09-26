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

    await new Promise((resolve) => setTimeout(resolve, 5000));

    let buttons = await page.$x("//button[contains(text(), 'Clock-out')]");
    if (buttons.length > 0) {
      await buttons[0].click();
    } else {
      console.log("Button not found");
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));

    buttons = await page.$x("//button[contains(text(), 'Clock-out')]");
    if (buttons.length > 0) {
      await buttons[0].click();
    } else {
      console.log("Button not found");
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));

    buttons = await page.$x("//button[contains(text(), 'Confirm')]");
    if (buttons.length > 0) {
      await buttons[0].click();
    } else {
      console.log("Button not found");
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await browser.close();
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error("An error occurred:", error);
  }
})();
