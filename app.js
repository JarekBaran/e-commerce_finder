const google = require("./lib/google");
const analyzer = require("./lib/analyzer");

const words = [`słuchawki`];

// words.map( word => google( word, 2, 30 )
//   .then(( data ) => {
//     console.log( `Dla frazy: ${ data.word } \n` );
//     console.log( `Sugestie: ${ data.suggestions } \n` );
//     console.log( `Domeny:` );

//     data.domains.forEach(( domain ) => console.log( domain ));
//   })
// );

const urls = ['https://e-zabawkowo.pl', 'https://krainazabawy.pl'];

analyzer(urls);