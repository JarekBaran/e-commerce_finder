const google = require("./lib/google");

const words = [`słuchawki`];

words.map( word => google( word, 2, 30 )
  .then(( data ) => {
    console.log( `Dla frazy: ${ data.word } \n` );
    console.log( `Sugestie: ${ data.suggestions } \n` );
    console.log( `Domeny:` );

    data.domains.forEach(( domain ) => console.log( domain ));
  })
);
