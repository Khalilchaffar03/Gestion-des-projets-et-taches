const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) =>{
    try{
        //lahna bch nekhou token mil headers mta3 request 
        // bearer aaaaaaaaaaa.dddddddddddd.ezdzafadfa
        let token = req.headers.authorization.split(' ')[1]

        // lahna bch nedcodi token w nvérifih
        const decoded = await jwt.verify( token , process.env.SECRET_KEY )
        
        req.user = decoded

        // bch taadini snn maghir next mayetaadech
        next()
    }catch(error){  
        res.status(401).send('token ghalet');
    }
}


module.exports = { verifyToken }