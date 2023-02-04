const User = require('../models/User.model');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10
const mongoose = require('mongoose');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const Trip = require('../models/Trip.model');

// create the currentUser

router.get('/signup', isLoggedOut, (req, res) => {
    res.render('auth/signup')
})

router.post('/signup', (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (!email || !password) {
        res.render('auth/signup', { errorMessage: "Please fill in all mandatory fields. Email and password are required." })
        return
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!regex.test(password)) {
        res.render('auth/signup', { errorMessage: "Please input a password at least 8 characters long, with a lowercase and uppercase letter." })
        return
    }
    bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
            console.log("Salt: ", salt)
            return bcrypt.hash(password, salt)
        })
        .then(hashedPassword => {
            console.log("Hashed Password: ", hashedPassword)
            return User.create({
                email: email,
                passwordHash: hashedPassword
            })
        })
        .then((result) => {
            req.session.currentUser = result
        })
        .then((result) => {
            res.redirect('/trips')
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/signup', { errorMessage: error.message });
            }
            else if (error.code === 11000) {
                res.render('auth/signup', { errorMessage: "There is already an account associated with the email please sign in or sign up with a new email" })
            }
            else {
                next(error);
            }
        });
})

router.get('/login', isLoggedOut, (req, res) => {
    console.log(req.session)
    res.render('auth/login')
})

// add custom middleware here 

router.post('/login', (req, res) => {
    console.log("SESSION =====>", req.session)
    console.log(req.body)
    const { email, password } = req.body

    if (!email || !password) {
        res.render('auth/login', { errorMessage: 'please enter an email or password' })
        return
    }

    User.findOne({ email })
        .then(user => {
            console.log(user)
            if (!user) {
                res.render('auth/login', { errorMessage: "User not found please sign up. No account associated with email." })
            } else if (bcrypt.compareSync(password, user.passwordHash)) {
                req.session.currentUser = user.toObject()
                delete req.session.currentUser.passwordHash
                res.redirect('/user-profile')
            } else {
                res.render('auth/login', { errorMessage: "Incorrect password" })
            }
        })
        .catch((err) => console.log(err));
})


router.get('/user-profile', isLoggedIn, (req, res) => {
    const { _id } = req.session.currentUser

    Trip.find({ user: _id })
        .then((trips) => {

            res.render('user/user-profile', { trips })
        })
        .catch((err) => console.log(err));
})

router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) next(err);
        res.redirect('/');
    });
});





//To do:
// home page - in route styling - CAM WIP 
// CSS - flexboxed/bootstrapped - in route - styling- CAM WIP
// drop down under ADD EVENT should include 5 categories (Sightseeing, Festival, Concert, Shopping, Food) - Nicole WIP
// FILTER the cities drop down - Nicole WIP
// do we want to follow the tutorial and add cloudidanry instead of the image URL for create an event - cool and fun 

// CSS divided up

// Cam
// Sign up & Login
// Index and Layouts

// Nicole
// Event and Trips
// 

// Done 
// Make delete route - NICOLE - done
// add links to pages/ - CAM -done
// Create “My Trips” - DONE
// Add an event to “My Trips” - DONE
// Delete an event from “My Trips” - NICOLE - done
// Create an event for “My Trip” - DONE
// update a trip - N/A 
// delete a Event - TO DO - done 
// delete trip - NIC - done
// create a trip - done
// read a trip - done
// add login log out, - done 
// create event - done 
// add to event schema add more cites - CAM/NIC - done
// my-trips page -done
// MY TRIPS PAGE - done
// images for event model - done
// #1 Priority MY TRIPS PAGE - done


module.exports = router