const User = require('../models/User.model');
const Event = require('../models/Event.model');
const router = require('express').Router();
const Trip = require('../models/Trip.model');
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

// create the event routes 

router.post('/add-event', fileUploader.single('image'), (req, res) => {
    const { eventName, description, category, price, city } = req.body
    const image = req.file
    if (!eventName || !description || !image || !category || !price || !city) {
        res.render('events/create', { errorMessage: "Please fill in all mandatory fields. All fields are required." })
        return
    }
    Event.create({ eventName: eventName, description: description, category: category, price: price, image: req.file.path, city: city })
        .then(result => {
            console.log(result);
            res.redirect('/events')
            return
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

router.get('/events/:eventId', isLoggedIn, (req, res) => {
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

router.get('/city/:city', (req, res) => {
    let cityName = req.params.city.replace("-", " ");
    Event.find({ city: cityName })
        .then((result) => {
            res.render('events/city', { result })
        })
})


module.exports = router