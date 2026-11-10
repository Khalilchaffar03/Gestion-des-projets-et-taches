// page hedhi bch nasn3ou fiha model tache bil bibliotheque mongoose

const mongoose = require('mongoose');
// defenition mta3 tache w les attributs mte3ha
const tacheSchema = new mongoose.Schema({
    titre : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    statut : {
        type : String,
        enum : ['to do','doing','done']    
    },
    deadline : {
        type : Date
    },
    utilisateurAssocie :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    projetAssocie : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Projet'
    },
}) 
// hna sna3na lmodel bil bibliotheque mongoose w samineha Tache
const Tache = mongoose.model('Tache', tacheSchema);

// w bch nexportiwouha bch najmou nesta3mlouh fil controlleur
module.exports = Tache;