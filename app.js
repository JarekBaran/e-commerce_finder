const google = require("./lib/google");
const analyzer = require("./lib/analyzer");

// const words = [`słuchawki`];

// words.map( word => google( word, 2, 30 )
//   .then(( data ) => {
  //     console.log( `Dla frazy: ${ data.word } \n` );
  //     console.log( `Sugestie: ${ data.suggestions } \n` );
  //     console.log( `Domeny:` );

  //     data.domains.forEach(( domain ) => console.log( domain ));
  //   })
  // );

  // const urls = ['wordpress-demo.jarekbaran.dev', 'woocommerce-demo.jarekbaran.dev', 'prestashop-demo.jarekbaran.dev', 'devshop-707702.shoparena.pl'];

  // analyzer(urls)
  //   .then((data) => data.forEach((domain) => console.log(domain)));


  /// TEST

  const words = [`meble dla dzieci 3-6 lat`];

  words.map( word => google( word, 2, 30 )
    .then(( data ) => {
      console.log( `Dla frazy: ${ data.word } \n` );
      console.log( `Sugestie: ${ data.suggestions } \n` );
      console.log( `Domeny: ${ data.domains.size } \n` );

      data.domains.forEach((domain) => console.log(domain));

      console.log( `\n Analyzer START \n` );
      analyzer(data.domains)
        .then((data) => data.forEach((domain) => console.log(domain)));
  })
);
