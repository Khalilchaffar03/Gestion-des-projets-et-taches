const express = require('express')
const router = express.Router();
const {create, ById, list, deleteProjet, update} = require('../controllers/projet')

// lahna bch naamel definition mta3 les endpoints mte3i bch norbet app bil les features b router

router.post('/create', create)
router.get('/byid/:id', ById)
router.get('/list', list)
router.delete('/delete/:id', deleteProjet)
router.put('/update/:id', update)



module.exports = router