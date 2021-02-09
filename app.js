const google = require("./lib/google");
const analyzer = require("./lib/analyzer");

const ecFinder = (words) => {
  words.map(word => google(word, 2, 30)
    .then((data) => {
      console.log(`Dla frazy: ${data.word} \n`);
      console.log(`Sugestie: ${data.suggestions} \n`);
      console.log(`Domeny: ${data.domains.size} \n`);

      data.domains.forEach((domain) => console.log(domain));

      console.log(`\n Analyzer START \n`);

      analyzer(data.domains)
        .then((data) => data.forEach((domain) => console.log(domain)));
    })
  )
}


/// Test ecFinder

const search = [`meble dla dzieci 3-6 lat`];

// ecFinder(search);

/// Test analyzer

domains = [
  'wordpress-demo.jarekbaran.dev',
  'woocommerce-demo.jarekbaran.dev',
  'prestashop-demo.jarekbaran.dev',
  'devshop-707702.shoparena.pl',
];

analyzer(domains)
  .then((data) => data.forEach((domain) => console.log(domain)));
