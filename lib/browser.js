const puppeteer = require("puppeteer");

const launchBrowser = async () => {

  let browser;

  const args = [
    "--disable-infobars",
    "--disable-dev-shm-usage",
    "--disable-setuid-sandbox",
    "--disable-accelerated-2d-canvas",
    "--disable-gpu",
    "--no-sandbox",
    "--lang=pl-PL,pl"
  ];

  try {

    browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      ignoreHTTPSErrors: true,
      args,
      ignoreDefaultArgs: ["--disable-extensions"],
    });

  } catch (e) {

    console.error("Unable to launch browser", e);
    return [() => {}, () => {}];

  }

  const exitBrowser = async () => {
    if (!browser) return;

    try {
      await browser.close();

    } catch (e) { }

  }

  const newPage = async () => {
    try {
      const page = await browser.newPage();

      const closePage = async () => {
        if (!page) return;
        try {
          await page.close();
        } catch(e) {}
      }

      return [page, closePage];

    } catch(e) {
        console.error("Unable to create a new page");
        return [];
    }
  };

  return [ newPage, exitBrowser ];
};

module.exports = { launchBrowser };
