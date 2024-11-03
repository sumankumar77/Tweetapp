const express = require('express');
const twitt = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');


twitt.use(bodyParser.urlencoded({extended : false}));

router.get("/",  (req, res, next) =>{

    if(req.session){
        req.session.destroy(()=>{
            res.redirect("/login");

        })
    }
})

module.exports = router;