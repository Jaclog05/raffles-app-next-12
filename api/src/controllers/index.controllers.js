const controllers = {}
const Raffle = require('../models/Raffle')

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

module.exports = controllers