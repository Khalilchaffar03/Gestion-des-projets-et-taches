
// Asslema mr nidhal hedha fichier mta3 lconnexion
// ayetna lil bibliotheque mongoose baaed ma3melna installation

const mongoose = require('mongoose');

// lahne bch nasn3ou w nconnectiw ala db mteena bil port mtaa mongo betbiaa yelzem nestnewh lin ykamel b then w catch wla try async await
mongoose.connect('mongodb://127.0.0.1:27017/gestion_des_projets_taches')
    .then(
        ()=>{
            console.log('db tekhdem mrigla :)');
        }
    )
    .catch(
        ()=>{
            console.log('db ma tekhdemch fama mochkla fil cnx :(');
        }
    )


// lahna bch nhot methode thenya b try fi commentaire
/*
const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/gestion_des_projets_taches')
        console.log('db tekhdem mrigla :)');
        }
    catch{
        console.log('db ma tekhdemch fama mochkla fil cnx :(');
    }
*/