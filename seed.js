const mongoose = require('mongoose');
const Event = require('./models/Event.model');

//Two steps in the seed file
//1. open up the mongoose connection
//2. add all of these documents to my colection

let events = [
  {
    eventName: 'MAMI Film Festival',
    description: 'Jio MAMI Mumbai Film Festival is the most immersive and comprehensive programme that celebrates the diverse cinematic voices of India through an international annual platform that instils pride in audiences and unites the film fraternity.',
    category: 'Festival',
    price: 22,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675516923/movie-project/dfbxt5vfzowmulqpmk3t.png',
    city: 'Mumbai'
  },
  {
    eventName: 'Little Flea Market',
    description: 'Mumbai’s happiest flea market, The Lil Flea is coming back at the fantastic Jio World Garden, BKC after a long gap of almost 3 years in the beautiful January weather! The most loved festival of discovery, shopping, food, music and all things creative!',
    category: 'Shopping',
    price: 0,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675516352/movie-project/qlixrfkmfn8pgz5p3uum.jpg',
    city: 'Mumbai'
  },
  {
    eventName: 'Prithvi Theatre',
    description: 'an intimate space designed as a non-profit institution for the development and promotion of theatre and the performing arts',
    category: 'Sightseeing',
    price: 15,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675520982/movie-project/prithvi-theatre_kbgdij.jpg',
    city: 'Mumbai'
  },
  {
    eventName: 'G5A Foundation',
    description: 'G5A warehouse is a repurposed warehouse in the mill district of central Mumbai. We foster a creative hub for artists, audiences, and communities through our many diverse spaces. The black box, the study, the terrace, and PORT Kitchen & Bar, host programs across a range of contemporary art disciplines and forms, while providing a safe and inclusive space for new ideas, new conversations, and new connections.',
    category: 'Sightseeing',
    price: 0,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675522343/movie-project/g5a_of1ol0.jpg',
    city: 'Mumbai'
  },
  {
    eventName: 'Royal Opera House',
    description: 'Having been extensively restored and reopened in October 2016, we are a performance space and cultural venue par excellence. Widely touted as the Cultural Crown Jewel of Mumbai and the only surviving Opera House in India, we are one of the last standing Baroque structures in Mumbai today.',
    category: 'Concert',
    price: 100,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675519733/movie-project/royal-opera-house_fvorst.jpg',
    city: 'Mumbai'
  },
  {
    eventName: 'Tate Modern',
    description: 'Tate is an institution that houses, in a network of four art galleries, the national collection of British art, and international modern and contemporary art. It is not a government institution, but its main sponsor is the UK Department for Digital, Culture, Media and Sport.',
    category: 'Sightseeing',
    price: 0,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675519756/movie-project/tate-modern_vjxhe8.jpg',
    city: 'London'
  },
  {
    eventName: 'O2 Arena',
    description: 'The O2 Arena, commonly known as the O2, is a multi-purpose indoor arena in the centre of the O2 entertainment complex on the Greenwich Peninsula in southeast London. It opened in its present form in 2007. It has the second-highest seating capacity of any indoor venue in the United Kingdom, behind the Manchester Arena.',
    category: 'Concert',
    price: 50,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675520762/movie-project/O2-arena_bsoz0r.jpg',
    city: 'London'
  },
  {
    eventName: 'The Black Cultural Archives',
    description: 'An archive and heritage centre devoted to the histories of people of African and Caribbean descent in Britain.',
    category: 'Sightseeing',
    price: 0,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675520743/movie-project/black-cultural-archives_jdlw0w.jpg',
    city: 'London'
  },
  {
    eventName: 'Big Ben',
    description: 'Big Ben is the nickname for the Great Bell of the Great Clock of Westminster, at the north end of the Palace of Westminster in London, England, and the name is frequently extended to refer also to the clock and the clock tower.',
    category: 'Sightseeing',
    price: 0,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675519357/movie-project/big-ben_vk3koq.jpg',
    city: 'London'
  },
  {
    eventName: 'Camden Market',
    description: 'Camden Town is famed for its market, a warren of fashion and curiosities by the Regent’s Canal. A haven of counter culture, the area is popular with tourists, teenagers and punks. The thriving nightlife scene includes live music in alternative clubs and old-school pubs, and major stars playing at the Jazz Cafe and the Roundhouse. Cafes bustle during the day. Nearby Regent’s Park has formal gardens and the London Zoo.',
    category: 'Food',
    price: 0,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675519703/movie-project/camden-market_elt0ds.jpg',
    city: 'London'
  }, {
    eventName: 'Brooklyn Museum',
    description: 'The Brooklyn Museum is an art museum located in the New York City borough of Brooklyn. At 560,000 square feet, is the second largest museum in New York City and contains an art collection with around 1.5 million objects.',
    category: 'Sightseeing',
    price: 0,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675519509/movie-project/brooklyn-museum_wdt9zs.jpg',
    city: 'New York'
  },
  {
    eventName: 'The High Line',
    description: 'The High Line is a public park built on a historic freight rail line elevated above the streets on Manhattan’s West Side. Saved from demolition by neighborhood residents and the City of New York, the High Line opened in 2009 as a hybrid public space where visitors experience nature, art, and design.',
    category: 'Sightseeing',
    price: 0,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675519781/movie-project/the-high-line_pi49un.jpg',
    city: 'New York'
  },
  {
    eventName: 'Webster Hall',
    description: 'Webster Hall is a nightclub and concert venue located at 125 East 11th Street, between Third and Fourth Avenues, near Astor Place, in the East Village of Manhattan, New York City.',
    category: 'Concert',
    price: 50,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675519803/movie-project/webster-hall_sqhrt0.jpg',
    city: 'New York'
  },
  {
    eventName: 'Bryant Park',
    description: 'Bryant Park is a 9.6-acre public park located in the New York City borough of Manhattan. Privately managed, it is located between Fifth Avenue and Avenue of the Americas and between 40th and 42nd Streets in Midtown Manhattan.',
    category: 'Sightseeing',
    price: 0,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675519531/movie-project/bryant-park_cz5k6z.jpg',
    city: 'New York'
  },
  {
    eventName: 'Katz Delicatessen',
    description: 'In 1888, a small deli by the name of Iceland Brothers was established on Ludlow Street in New York’s Lower East Side by the Iceland brothers. Upon the arrival of Willy Katz in 1903, the name of the store was officially changed to "Iceland & Katz". Willy’s cousin Benny joined him in 1910, buying out the Iceland brothers to officially form Katz’s Delicatessen. Their landsman Harry Tarowsky bought into the partnership in April 1917. Katz’s Deli was moved across the street, to its present location, during the construction of the subway system. The vacant lot on Houston Street (pronounced "House-ton" after a Dutch emigrant of the same name) was home to barrels of meat and pickles until the present storefront facade was added between 1946-49.',
    category: 'Food',
    price: 20,
    image: 'https://res.cloudinary.com/ddieot9rc/image/upload/v1675520045/movie-project/katz-deli_mzbbdg.jpg',
    city: 'New York'
  }
]


const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1/project-2';

const connectionParams = { useNewUrlParser: true };

mongoose
  .connect(MONGODB_URI, connectionParams)
  .then((db) => {
    console.log('Connected to db: ', db.connections[0].name);
    return Event.insertMany(events);
  })
  .then((result) => {
    console.log(`Successfully added ${result.length} events.`);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Db connection closed!');
  })
  .catch((err) => {
    console.log('Something went wrong while seeding db: ', err);
  });
