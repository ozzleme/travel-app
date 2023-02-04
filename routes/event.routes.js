const User = require('../models/User.model');
const Event = require('../models/Event.model');
const router = require('express').Router();
// const {isAdmin} = require('../middleware/route-guard.js');
const Trip = require('../models/Trip.model');
const events = require("../config/events.json");
const axios = require('axios').default;
const fileUploader = require('../config/cloudinary.config');







// create the event routes 
// this route has the same action of the post form in create hbs page 

router.post('/add-event', fileUploader.single('image'), (req, res) => {
    const { eventName, description, category, price, city } = req.body
    Event.create({ eventName: eventName, description: description, category: category, price: price, image: req.file.path, city: city })
        .then(result => {
            console.log(result);
            res.redirect('/events')
        })
        .catch((err) => console.log(err));
})


// read the document by finding all the events and render them

router.get('/events', (req, res) => {
    Event.find()
        .then((events) => {
            res.render('events/event-list', { events })
        })
        .catch((err) => console.log(err));
})

// create the document and make the form visible to used to add an event 

router.get('/add-event', (req, res) => {
    res.render('events/create')
})

// read one document using params 

router.get('/events/:eventId', (req, res) => {
    let trips = []
    Trip.find({
        user: req.session.currentUser._id
    })
        .then((tripForUser) => {
            trips = tripForUser
            console.log(trips)
            return Event.findById(req.params.eventId)
        })
        .then((singleEvent) => {
            res.render('events/event-details', { singleEvent, trips })
        })
        .catch((err) => console.log(err));
})


// delete one event 
router.post('/events/:eventId/delete', (req, res, next) => {
    const { eventId } = req.params;
    Event.findByIdAndRemove(eventId)
        .then((result) => {
            console.log('The result after deleting the event is', result)
            res.redirect('/events')
        })
        .catch((err) => {
            console.log('The error while deleting the event-details is, ', err)
        })
})

// creates API in Postman where in you can search by city , price, etc 
// this is the API service in which you can filter and sort through arrays 
// you can search the API by manipulating the URL in Postman following conventions 
// shows the events.json model which has been added multiple times by calling the functions below
// should we use a events.json instead of a seed file? 
router.get("/event-cities", async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "price";
        let city = req.query.city || "All";
        const cityOptions = [
            "Mumbai",
            "London",
            "New York",
        ];
        city === "All"
            ? (city = [...cityOptions])
            : (city = req.query.city.split(","));
        req.query.sort ? (sort = req.query.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const events = await Event.find({ city: { $regex: search, $options: "i" } })
            .where("city")
            .in([...city])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await Event.countDocuments({
            city: { $in: [...city] },
            name: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            cities: cityOptions,
            events,
        };

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// do not uncomment as it will continue to create events
// code below creates the events model using insertEvents from the json file in the config folder
// const insertEvents = async () => {
//     try {
//         const docs = await Event.insertMany(events);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };
// called after insertEvents to ensure you have the right docs and can see them in the console
// insertEvents()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

// does not console.log any response 
// does not work 
// const getEventInfo = city => {
//     axios
//         .get("http://localhost:3000/event-cities")
//         .then(response => {
//             console.log('Response from API is: ', response);
//             const eventDetail = response.data[0];
//             console.log('a single event details: ', eventDetail);
//         })
//         .catch(err => console.log(err));
// };


// function onClick() {
//     document
//         .getElementById('get-city-btn')
//         .addEventListener('click', () => {
//             const userInput = document.getElementById('city-name-input').value;
//             getEventInfo(userInput);
//         });
// };

// QUESTIONS : 
// Omar can you explain more how you would filter through the events model using for loop
// how do we get the userInput from a dropdown?
// omar's code below

// let filteredArray;
// Event.find()
// .then(result=>{
//   for(i=0;result.length;i++){
//     if(result[i].cities===userIputCitiies){
//       filteredArrray.push(result[i])
//     }
//   }
// })



module.exports = router;