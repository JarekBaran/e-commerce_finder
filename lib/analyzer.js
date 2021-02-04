const Wappalyzer = require('wappalyzer');

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
        urls.map(async (url) => ({
          url,
          analyze: await wappalyzer.open(`https://${url}`).analyze(),
        }))
      )

    } catch (error) {

      console.error(error);

    }

  await wappalyzer.destroy();

  return filteredId(results, filterId);
};


const filteredId = (results, filterId) => results.map((domain) => {

  let technologyName = [];

  domain.analyze.technologies.forEach((technology) => {
    technology.categories.filter((category) => {
      category.id === filterId && technologyName.push(technology.name)
    });
  });

  return { domain: domain.url, technology: technologyName };

});

module.exports = analyzer;
