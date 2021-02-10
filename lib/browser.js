const puppeteer = require("puppeteer");

const browser = async () => {

  let chrome;

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

    chrome = await puppeteer.launch({
      headless: true,
      devtools: false,
      ignoreHTTPSErrors: true,
      args,
      ignoreDefaultArgs: ["--disable-extensions"],
    });

  } catch (err) {

    console.error("Unable to launch browser", err);
    return [() => {}, () => {}];

  }

  const exitBrowser = async () => {
    if (!chrome) return;

    try {
      await chrome.close();

    } catch (err) { }

  }

  const newPage = async () => {
    try {
      const page = await chrome.newPage();

      const closePage = async () => {

        if (!page) return;

        try {

          await page.close();

        } catch(err) {}
      }

      return [page, closePage];

    } catch (err) {

        console.error("Unable to create a new page");

      return [];
    }
  };

  return [ newPage, exitBrowser ];
};

module.exports = { browser };
