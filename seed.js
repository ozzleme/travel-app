const mongoose = require('mongoose');
const Event = require('./models/Event.model');

//Two steps in the seed file
//1. open up the mongoose connection
//2. add all of these documents to my colection

let events = [
  {
    eventName: 'MAMI Film Festival',
    description: 'A big movie festival in Mumbai',
    category: 'Festival',
    price: 22,
    image: './images/MAMI.png',
    city: 'Mumbai'
  },
  {
    eventName: 'Little Flea Market',
    description: 'A local shopping event with curated hand-made goods.',
    category: 'Concert',
    price: 0,
    image: './images/little-flea.jpeg',
    city: 'Mumbai'
  },
  {
    eventName: 'Royal Opera House',
    description: 'A heritage site for watching live performances.',
    category: 'Shopping',
    price: 0,
    image: './images/royal-opera-house.jpeg',
    city: 'Mumbai'
  },
  {
    eventName: 'Tate Modern',
    description: 'A contemporary art gallery ',
    category: 'Sightseeing',
    price: 0,
    image: './images/tate-modern.jpeg',
    city: 'London'
  },
  {
    eventName: 'Big Ben',
    description: 'See a big golden clocktower!',
    category: 'Sightseeing',
    price: 0,
    image: './images/big-ben.jpeg',
    city: 'London'
  },
  {
    eventName: 'Camden Market',
    description: 'An old London market with contemporary food and shopping stores.',
    category: 'Food',
    price: 0,
    image: './images/camden-market.jpeg',
    city: 'London'
  }, {
    eventName: 'Brooklyn Museum',
    description: 'A contemporary museum foccused on art from the best artists of today.',
    category: 'Sightseeing',
    price: 0,
    image: './images/brooklyn-museum.jpeg',
    city: 'New York'
  },
  {
    eventName: 'The High Line',
    description: 'An outdoor garden filled with local flora, fauna and sometimes art!',
    category: 'Sightseeing',
    price: 0,
    image: './images/the-high-line.jpeg',
    city: 'New York'
  },
  {
    eventName: 'Webster Hall',
    description: 'A concert hall for up and coming artists.',
    category: 'Concert',
    price: 50,
    image: './images/webster-hall.jpeg',
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
    return Event.create(events);
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
