const express = require('express');
const router = express.Router();
const {createUserAccount, signIn, list, ById, deleteUser, update} = require('../controllers/user');
const verifyToken = require('../middlewares/auth')
const verifyRole = require('../middlewares/role')

// lahna bch naamel definition mta3 les endpoints mte3i bch norbet app bil les features b router

router.post('/createuser', createUserAccount);
router.post('/signin', signIn);
router.get('/list', verifyToken, verifyRole ,list);
router.get('/byid/:id', verifyToken, ById);
router.delete('/delete/:id', verifyToken, verifyRole, deleteUser);
router.put('/update/:id', verifyToken, update);



module.exports = router