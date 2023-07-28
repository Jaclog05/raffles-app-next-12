const { Router } = require('express')
const { 
    getRaffles,
    getUsers, 
    createRaffle,
    createUser,
    loginUser,
    getRaffleById, 
    deleteRaffle,
    deleteUser,
    getProfileInfo,
    logoutUser
} =  require('../controllers/index.controllers')

const router = Router()

router.get('/', getRaffles)
router.get('/users', getUsers)
router.get('/profile', getProfileInfo)
router.post('/create', createRaffle)
router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/raffle/:id', getRaffleById)
router.delete('/raffle/:_id', deleteRaffle)
router.delete('/user/:_id', deleteUser)

module.exports = router