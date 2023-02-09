
const express = require("express");
const cors = require("cors");
const app = express();
const eventRoutes = require("./routes/event.routes");



require("dotenv").config();
require("./db");
require("./config")(app);
require("./config/session.config")(app);


const capitalize = require("./utils/capitalize");
const projectName = "project-2";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use((req, res, next) => {
    console.log('Hello People Dem')
    app.locals.userInSession = req.session.currentUser
    next()
})


const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/event.routes'));
app.use('/', require('./routes/trip.routes'));

require("./error-handling")(app);

module.exports = app;
