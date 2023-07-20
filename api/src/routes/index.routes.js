const { Router } = require('express')
const { 
    getRaffles, 
    createRaffle, 
    getRaffleById, 
    deleteRaffle} =  require('../controllers/index.controllers')

const router = Router()

router.get('/', getRaffles)
router.post('/create', createRaffle)
router.get('/raffle/:id', getRaffleById)
router.delete('/raffle/:_id', deleteRaffle)

module.exports = router