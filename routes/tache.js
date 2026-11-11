const express = require('express')
const router = express.Router();
const {create,ByprojetId, ById, list, deleteTache, update} = require('../controllers/tache')

// lahna bch naamel definition mta3 les endpoints mte3i bch norbet app bil les features b router

router.post('/create', create)
router.get('/byid/:id', ById)
router.get('/list', list)
router.delete('/delete/:id', deleteTache)
router.put('/update/:id', update)



module.exports = router