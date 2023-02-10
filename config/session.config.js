const session = require('express-session');

const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');

module.exports = app => {

    app.set('trust proxy', 1);

    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_EN === 'production',
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://labarrbell:1234@cluster0.jefqq6s.mongodb.net/travelapp2?retryWrites=true&w=majority'

            })

        })
    );
};