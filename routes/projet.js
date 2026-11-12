const express = require('express')
const router = express.Router();
const {create, ById, list, deleteProjet, update} = require('../controllers/projet')
const { verifyToken } = require('../middlewares/auth');
// lahna bch naamel definition mta3 les endpoints mte3i bch norbet app bil les features b router

router.post('/create', verifyToken, create)
router.get('/byid/:id', verifyToken, ById)
router.get('/list', verifyToken, list)
router.delete('/delete/:id', verifyToken, deleteProjet)
router.put('/update/:id', verifyToken, update)



module.exports = router