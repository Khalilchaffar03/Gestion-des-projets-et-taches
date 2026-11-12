
// lahne ayetna lil model user bch najmou nesta3mlouh fil controlleur
const User = require('../models/user');

// lahne ayetna lil bib bcrypt bch ncryptiw les mots de passe mta3 les users
const bcrypt = require('bcrypt');

// lahne ayetna lil bib jwt bch nasn3ou tokens mta3 users
const jwt = require('jsonwebtoken');


// lahne bch nasn3ou feature mtaa creation manager 
const createManagerAccount = async () => {
    try{
        // lahna nchouf f collection user est ce que mawjoud compte b role manager ou non w traj3elna table find function
        let existManager = await User.find({role : 'manager'})
        // lahna bch ntestiw table vide wla le kn taille mte3ha 0 ray vide w ma3ana hatta compte role mte3o manager
        // wkthha nmchi nasn3ou
        if(existManager.length == 0){
            let data = {
                nom :"manager manager",
                login : process.env.LOGIN,
                "mot de passe": process.env.PASS,
                role : 'manager'
            }
            let admin = new User(data);
            // Lahna 9bal mansajlou f base ncryptih bil bcrypt w naatyh salt 10 eli howa 3ibara round atito 10 itérations
            admin['mot de passe'] = bcrypt.hashSync(data['mot de passe'],10);
            await admin.save()
            console.log('manager tesna3 f base oumouro mrigla')
        }else{
            console.log('compte manager deja mawjoud f base')
        }
    }catch(err){
        console.log('fma mochkla f creation mt3 compte')
    }
}


// lahne bch nasn3ou feature mtaa creation user
const createUserAccount = async (req, res) => {
    try{
        // lahna bch hoto les données eli jeyin mil body mta3 request f west vaiable data 
        let data = req.body;
        // baaed bch nasn3ou user b les données hedhokm
        let user = new User(data)
        //baaed naamlou l cryptage mta3 password
        user['mot de passe'] = bcrypt.hashSync(data['mot de passe'],10);
        // nhoto role mte3o eli howa user
        user.role = 'user';
        // lahna bch nsajlou l user f base bch yetzadena f base
        let saveUser = await user.save();
        // bch nraj3ou msg fih user eli tzad
        res.send(saveUser)
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

// lahne bch nasn3ou feature mtaa signin
const signIn = async (req, res) => {}

// lahne bch nasn3ou feature mtaa list users 
const list = async (req, res) => {}

// lahne bch nasn3ou feature mtaa getuser by id
const ById = async (req, res) => {}

// lahne bch nasn3ou feature mtaa delete user
const deleteUser = async (req, res) => {}


// lahne bch nasn3ou feature mtaa update user
const update = async (req, res) => {}


module.exports = {
    createManagerAccount,
    createUserAccount,
    signIn,
    list,
    ById,
    deleteUser,
    update
}