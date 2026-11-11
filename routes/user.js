const express = require('express');
const router = express.Router();
const {createUserAccount, signIn, list, ById, deleteUser, update} = require('../controllers/user');

// lahna bch naamel definition mta3 les endpoints mte3i bch norbet app bil les features b router
router.post('/createuser', createUserAccount);
router.post('/signin', signIn);
router.get('/list', list);
router.get('/byid/:id', ById);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', update);



module.exports = router