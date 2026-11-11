
// lahne ayetna lil model user bch najmou nesta3mlouh fil controlleur
const User = require('../models/user');

// lahne ayetna lil bib bcrypt bch ncryptiw les mots de passe mta3 les users
const bcrypt = require('bcrypt');

// lahne ayetna lil bib jwt bch nasn3ou tokens mta3 users
const jwt = require('jsonwebtoken');


// lahne bch nasn3ou feature mtaa creation manager 
const createManagerAccount = async () => {}


// lahne bch nasn3ou feature mtaa creation user
const createUserAccount = async (req, res) => {}

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