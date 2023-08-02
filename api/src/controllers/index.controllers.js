const controllers = {}
const Raffle = require('../models/Raffle')
const User = require('../models/User')
const {sign, verify} = require('jsonwebtoken')
const {serialize} = require('cookie')
const Stripe = require("stripe");
require('dotenv').config()

const {
  STRIPE_SECRET_KEY
} = process.env

const stripe = new Stripe(STRIPE_SECRET_KEY);

controllers.getRaffles = async (req, res) => {
    const raffles = await Raffle.find()
    res.json(raffles)
}

controllers.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

controllers.getProfileInfo = (req, res) => {
    const {token} = req.cookies
    try {
        const user = verify(token, 'secret')
        return res.json({email: user.email, username: user.username})
    } catch (error) {
        return res.json(200).json({"error": "Token invalido"})
    }
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

controllers.createSession = async (req, res) => {

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body,
      mode: "payment",
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/login",
    });

    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

controllers.loginUser = async (req, res) => {
    const {email, password} = req.body
    const validUser = await User.findOne({email, password})

    if(validUser){

            const token = sign(
                {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                email: validUser.email,
                username: validUser.name
            },
            "secret"
            )

        const serialized = serialize("token", token, 
        {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 *30,
            path: "/"
        } 
        )

        res.setHeader("Set-Cookie", serialized)
        return res.status(200).json({
            "message": "Logueado correctamente"
        })
    }
    
    return res.status(200).json({"error": "Credenciales incorrectas"})
}

controllers.logoutUser = async (req, res) => {

    const { token } = req.cookies;
    
        if (!token) {
            return res.status(401).json({ error: "Not logged in" });
        }

        const serialized = serialize("token", null, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 0,
            path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        return res.status(200).json({
            message: "Logout successful",
        });
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