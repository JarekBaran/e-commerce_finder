const puppeteer = require('puppeteer');

async function search(word) {

  let step = 0;
  let domains = new Set();
  let pagination = new Set();

  do {

    // start new browser instance

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.google.pl/search?q=${word}&filter=0&num=100&start=${step}00`);

    // get pagination

    const navigation = await page.$$eval("div[role='navigation'] tr[jsname] a", (pagination) => pagination.map((nextPage) => nextPage.href));

    navigation.map(nextPage => pagination.add(nextPage));

    // get domains

    const results = await page.$$eval("div.g div div > a", (domains) => domains.map((domain) => domain.href));

    results.map(domain => domains.add(domain.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i)[1]));

    // get next page

    console.log(`Search ${word} - page ${step}`);

    step++;

    // close browser instance

    await browser.close();

  } while (step <= pagination.size);

  return domains;

};

const words = [`telewizor`];

words.map(word => search(word).then((result) => console.log(result)));
