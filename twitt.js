const express = require('express');
const twitt = express();
const port = 3003;
const middleware = require('./middleware')
const path =  require('path')
const bodyParser = require("body-parser")
const mongoose = require("./database");
const session =  require("express-session");



const server = twitt.listen(port,() => console.log("Server listening on port " +  port));


twitt.set("view engine", "pug");
twitt.set("views", "views");


twitt.use(express.static(path.join(__dirname, "public")));
twitt.use(bodyParser.urlencoded({extended : false}));

twitt.use(session({
    secret: " bbq",
    resave: true,
    saveUninitialized: false
}))

//ROutes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logout');
const postRoute = require('./routes/postRoutes');
const profileRoute = require('./routes/profileRoutes');


// Api routes
const postsApiRoute = require('./routes/api/posts');
const usersApiRoute = require('./routes/api/users');

twitt.use("/login", loginRoute);
twitt.use("/register", registerRoute);
twitt.use("/logout", logoutRoute);
twitt.use("/posts", middleware.requireLogin, postRoute);
twitt.use("/profile", middleware.requireLogin, profileRoute);

twitt.use("/api/posts", postsApiRoute);
twitt.use("/api/users", usersApiRoute);

twitt.get("/", middleware.requireLogin, (req, res, next) =>{

    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    
    }
    res.status(200).render("home", payload);
})