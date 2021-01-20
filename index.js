const puppeteer = require('puppeteer');

async function google(word, pages = 10) {

  let domains = new Set();
  let pagination = 0;
  let suggestions;

  const args = [
    "--disable-infobars",
    "--disable-dev-shm-usage",
    "--disable-setuid-sandbox",
    "--disable-accelerated-2d-canvas",
    "--disable-gpu",
    "--no-sandbox",
    "--lang=pl-PL,pl"
  ];

  const browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      ignoreHTTPSErrors: true,
      args,
      ignoreDefaultArgs: ["--disable-extensions"],
    });

  do {

    const page = await browser.newPage();

    try {

      await page.goto(`https://www.google.pl/search?q=${word}&filter=0&num=100&start=${pagination}00&hl=pl`, {
        waitUntil: "networkidle0",
        timeout: 15000,
      });

      if (!pagination) {
        suggestions = await page.$$eval("div#botstuff a", (similar) => similar.map((link) => link.textContent));
      }

      const results = await page.$$eval("div.g div div > a", (nodes) => nodes.map((node) => node.href));
      console.log(results);

      results.forEach(domain => domains.add(domain.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i)[1]));
      console.log(domains);

    } catch (err) {

      console.log(`Something go bad: ${err}`);

    }

    // go next page

    pagination++;

    console.log(`Google Search: ${word} - page ${pagination}`);

  } while (pagination < pages);

  await browser.close();

  return { word, domains, suggestions };

};

const words = [`laptop`];

words.map(word => google(word, 2).then((data) => console.log(data)));
