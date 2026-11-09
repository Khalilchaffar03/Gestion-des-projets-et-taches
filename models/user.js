// page hedhi bch nasn3ou fiha model user bil bibliotheque mongoose

const mongoose = rquire('mongoose');


// defenition mta3 user w les attributs mte3ou
const userSchema = new mongoose.Schema({
    nom : {
        type : String
    },
    login : {
        type : String
    },
    "mot de passe" : {
        type : String
    },
    role : {
        type : String,
        enum : ['user','manager']
    },
    "date de creation" : {
        type : Date,
        default : Date.now
    }
})

// hna sna3na lmodel bil bibliotheque mongoose w samineh User

 const User = mongoose.model('User', userSchema);

// w bch nexportiwouh bch najmou nesta3mlouh fi fichier server.js
module.exports = User;
