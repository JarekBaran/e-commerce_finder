const Wappalyzer = require('wappalyzer');

const validURL = new RegExp('^https?://', 'i');

const getValidURL = (url) => validURL.test(url) ? url : `https://${url}`;

const getFiltered = (data, id) => data.map((domain) => {

  let stack = [];

  domain.analyze.technologies.forEach((technology) => {
    technology.categories.filter((category) => {
      category.id === id && stack.push(technology.name)
    });
  });

  return { host: domain.url, stack };

});

const analyzer = async (urls, filterId = 6) => {

  const options = {
    debug: false,
    delay: 500,
    headers: {},
    maxDepth: 3,
    maxUrls: 10,
    maxWait: 5000,
    recursive: true,
    probe: true,
    userAgent: 'Wappalyzer',
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
  };

  const wappalyzer = new Wappalyzer(options);

  let results = [];

    try {
      await wappalyzer.init();


      results = await Promise.all(
        [...urls].map(async (url) => ({
          url,
          analyze: await wappalyzer.open(getValidURL(url)).analyze(),
        }))
      )

    } catch (err) {

      console.error(err);

    }

  await wappalyzer.destroy();

  return getFiltered(results, filterId);
};

module.exports = analyzer;
