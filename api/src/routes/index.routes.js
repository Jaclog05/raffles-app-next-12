const { Router } = require('express')
const { 
    getRaffles, 
    createRaffle,
    createUser,
    getRaffleById, 
    deleteRaffle,
    deleteUser
} =  require('../controllers/index.controllers')

const router = Router()

router.get('/', getRaffles)
router.post('/create', createRaffle)
router.post('/register', createUser)
router.get('/raffle/:id', getRaffleById)
router.delete('/raffle/:_id', deleteRaffle)
router.delete('/user/:_id', deleteUser)

module.exports = router