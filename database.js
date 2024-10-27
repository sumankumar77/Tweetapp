const mongoose = require("mongoose");


class Database{

    
    constructor(){
        this.connect();
    }





    connect(){
        mongoose.connect("mongodb+srv://admin:dbuserpassword@twitterclonecluster.jpzgg.mongodb.net/?retryWrites=true&w=majority&appName=TwitterCloneCluster")
        .then(() => {
         console.log("database connection successful");
    })
        .catch((err) => {
        console.log("database connection error " + err);
    })
    }

}
// test

module.exports = new Database();

