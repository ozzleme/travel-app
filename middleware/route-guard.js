const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/signup');
    }
    next();
};

// if an already logged in user tries to access the login page it will redirect the user to the home page
const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/');
    }
    next();
};

// const isAdmin = (req, res, next) => {
//     if (req.user.role === 'admin') {
//         return res.redirect('/add-event') // or to the hbs page?
//     } else if (req.user.role === 'user') { 
//         return res.redirect('/login');
//     }
//     next();
// };



module.exports = {
    isLoggedIn,
    isLoggedOut,
    //isAdmin
};