// Asslema mr nidhal lahna fichier principal mte3na eli bch ylanci server w ykhadem l application 

// ayetna lil bibliotheque express bch najmou nasn3ou les apis w nlanciw server
const express = require('express');
require('dotenv').config();

//lahna importina les routes mte3na
const projetRoute = require('./routes/projet')
const tacheRoute = require('./routes/tache')
const userRoute = require('./routes/user')


const app = express();
// sta3melna use express.json() bch n9raw les données eli jeyin mel body mta3 les requetes w n7otouhom fi format json
app.use(express.json());

// lahna ayetna lil fichier mta3 lcnx maa db 
require('./config/connect');




app.use('/projet', projetRoute)
app.use('/tache', tacheRoute)
app.use('/user', userRoute)







// Lahna bch nkhadmou l backend ala port 3000 w naffichiw msg ki yekhdem kn manhotoch listen app tekhdem w tosket bch tokaad tekhdem lezem naamloi listn
app.listen( 
    3000 ,
    () => {
    console.log('kol chy ymchi mrigl serveur ymchi jawo ahla jaw :)');
    }
)