const User = require("../models/User.model");
const Event = require("../models/Event.model");
const router = require("express").Router();
const Trip = require("../models/Trip.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
const fileUploader = require('../config/cloudinary.config');


// create the trip routes

router.post("/add-trip", isLoggedIn, fileUploader.single('image'), (req, res) => {
  const { tripName, description } = req.body
  const image = req.file
  if (!tripName || !description || !image) {
    res.render('user/create-trip', { errorMessage: "Please fill in all mandatory fields. Trip name, description and image are required." })
    return
  }
  Trip.create({ tripName: tripName, description: description, user: req.session.currentUser._id, image: req.file.path })
    .then(result => {
      console.log(result);
      res.redirect("/user-profile");
      return
    })
    .catch((err) => console.log(err))
});

// read the document by finding all the trips and render them

router.get("/trips", isLoggedIn, (req, res) => {
  res.render("user/create-trip", { userInSession: req.session.currentUser });
});

router.get('/my-trips', isLoggedIn, (req, res) => {
  res.render('user/my-trips')
})

// creating trip with user id
router.post("/trips/:eventId", isLoggedIn, (req, res, next) => {
  const { eventId } = req.params;
  const { tripId } = req.body;
  Trip.findByIdAndUpdate(tripId, { $push: { event: eventId } }, { new: true })
    .then((foundPost) => res.redirect(`/trips/${tripId}`))
    .catch((err) => {
      console.log(`Err while getting a single post from the  DB: ${err}`);
      next(err);
    });
});

//   reading trip for specific userID
router.get("/trips/:tripId", isLoggedIn, (req, res, next) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .populate("event")
    .then((trip) => {
      console.log("trip found", trip);
      res.render("user/my-trips", trip);
    })
    .catch((err) => {
      console.log("Something went wrong while getting trip id: ", err);
      next(err);
    });
});


router.post('/trips/:tripId/delete', (req, res, next) => {
  const { tripId } = req.params;
  Trip.findByIdAndRemove(tripId)
    .then(() => {
      res.redirect('/user-profile')
    })
    .catch((err) => {
      console.log('The error while deleting a trip is, ', err)
    })
})

module.exports = router;