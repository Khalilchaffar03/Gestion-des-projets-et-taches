// page hedhi bch nasn3ou fiha model projet bil bibliotheque mongoose

const mongoose = require('mongoose');

// defenition mta3 projet w les attributs mte3ou
const projetSchema = new mongoose.Schema({
    nom : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    proprietaire : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    statut : {
        type : String,
        enum : ['en cours','terminé','en pause'],
        default: 'en cours'

    },
    "date de creation" : {
        type : Date,
        default : Date.now
    }
})

// hna sna3na lmodel bil bibliotheque mongoose w samineh Projet
const Projet = mongoose.model('Projet', projetSchema);

// w bch nexportiwouh bch najmou nesta3mlouh fil controlleur
module.exports = Projet;