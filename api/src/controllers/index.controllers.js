const controllers = {}
const Raffle = require('../models/Raffle')
const User = require('../models/User')

controllers.getRaffles = async (req, res) => {
    const raffles = await Raffle.find()
    res.json(raffles)
}

controllers.createRaffle = async (req, res) => {
    let {prize, image, price, numTickets, lotery, date} = req.body
    const newRaffle = new Raffle({prize, image, price, numTickets, lotery, date})
    await newRaffle.save()
    res.json(newRaffle)
}

controllers.createUser = async (req, res) => {
    let {name, email, password, cellPhone, address, idType, idNum} = req.body
    const newUser = new User({name, email, password, cellPhone, address, idType, idNum})
    await newUser.save()
    res.json(newUser)
}

controllers.getRaffleById = async (req, res) => {
    const {id} = req.params
    const raffleDetails = await Raffle.find({"_id": id})
    res.json(raffleDetails)
}

controllers.deleteRaffle = async (req, res) => {
    const {_id} = req.params
    const deletedRaffle = await Raffle.deleteOne({"_id": _id})
    res.json(deletedRaffle)
}

controllers.deleteUser = async (req, res) => {
    const {_id} = req.params
    const deletedUser = await User.deleteOne({"_id": _id})
    res.json(deletedUser)
}

module.exports = controllers