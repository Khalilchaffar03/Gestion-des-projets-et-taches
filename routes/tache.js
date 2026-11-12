const express = require('express')
const router = express.Router();
const {create,ByprojetId, ById, list, deleteTache, update, assign} = require('../Controllers/tache')
const { verifyToken } = require('../middlewares/auth');
const { verifyRole } = require('../middlewares/role');
// lahna bch naamel definition mta3 les endpoints mte3i bch norbet app bil les features b router

router.post('/create', verifyToken, create)
router.get('/byid/:id', verifyToken, ById)
router.get('/byprojet/:projetId', verifyToken, ByprojetId)
router.get('/list', verifyToken, list)
router.delete('/delete/:id', verifyToken, deleteTache)
router.put('/update/:id', verifyToken, update)
router.patch('/assign/:id', verifyToken, verifyRole, assign)



module.exports = router