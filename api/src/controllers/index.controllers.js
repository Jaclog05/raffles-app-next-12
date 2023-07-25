const controllers = {}
const Raffle = require('../models/Raffle')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {serialize} = require('cookie')

controllers.getRaffles = async (req, res) => {
    const raffles = await Raffle.find()
    res.json(raffles)
}

controllers.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
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

controllers.loginUser = async (req, res) => {
    const {email, password} = req.body
    const validUser = await User.findOne({email, password})
    if(validUser){

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day expiration
            email: validUser.email,
            username: validUser.name
        }, 'secret')

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            path: '/'
        })

        res.setHeader('Set-Cookie', serialized)
        res.json({"message": "Registrado correctamente"})
    }else{
        res.json({"error": "Credenciales incorrectas"})
    }
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