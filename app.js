const google = require("./lib/google");
const analyzer = require("./lib/analyzer");
const addDomain = require("./lib/mongoose");

const ecFinder = (words) => {
  words.map(word => google(word, 2, 30)
    .then((data) => {

      console.log(`*** Wyszukiwanie *** \n`);

      console.log(`Dla frazy: ${data.word} \n`);
      console.log(`Sugestie: ${data.suggestions} \n`);
      console.log(`Znalezionych domen: ${data.domains.size} \n`);

      console.log(`*** Start analizy *** \n`);

      analyzer(data.domains)
      .then((data) => {
        data.forEach((domain) => {
          addDomain({ ...domain, word })
        })
      });

    })
  )
}

/// Test ecFinder

const search = [`rolety materiałowe`];

ecFinder(search);

/// Test analyzer

domains = [
  'wordpress-demo.jarekbaran.dev',
  'woocommerce-demo.jarekbaran.dev',
  'prestashop-demo.jarekbaran.dev',
  'devshop-707702.shoparena.pl',
];

// const word = search[0];

// analyzer(domains)
//   .then((data) => {
//     data.forEach((domain) => {
//       addDomain({ ...domain, word })
//     })
//   });
