const { browser } = require("./browser");

const google = async ( word, subPages = 10, perPage = 100 ) => {

  const [ newPage, exitBrowser ] = await browser();
  const [ page ] = await newPage();

  if ( !page ) return;

  let domains = new Set();
  let pagination = 0;
  let suggestions;

  const getSearch = async (url) => {
    try {

      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 15000,
      });

    } catch (err) {

      console.error("Unable to visit " + url, e);

      await exitBrowser();

      return;
    }
  }

  const getSuggestions = async () => {

    try {

      suggestions = await page.$$eval("div#botstuff .card-section a", (similar) => similar.map((link) => link.textContent));

    } catch (err) {

      console.error(`Something go wrong with suggestions: ${err}`);

    }
  }

  const getResults = async () => {

    try {

      const results = await page.$$eval("div.g div div > a", (links) => links.map((link) => link.href));

      results.forEach(domain => domains.add(domain.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i)[1]));

    } catch (err) {

      console.error(`Something go wrong with results: ${err}`);

    }
  }

  // start main loop

  do {

    const url = `https://www.google.pl/search?q=${ word }&filter=0&num=${ perPage }&start=${ pagination ? perPage*pagination : pagination }&hl=pl`;

    await getSearch(url);

    (!pagination) && await getSuggestions();

    await getResults();

    // go next pagination page

    pagination++;

    console.log(`Google Search: ${word} - page ${pagination}`);
    console.log(`${url}\n`);

  } while (pagination < subPages);

  // close on exit

  await exitBrowser();

  return { word, domains, suggestions };

};

module.exports = google;
