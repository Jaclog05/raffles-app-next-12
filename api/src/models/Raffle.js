const {Schema, model} = require('mongoose')

const RaffleSchema = new Schema({
    numTickets: {
        type: Number,
        require: false
    },
    image: {
        type: String,
        require: false
    },
    prize: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: false
    },
    lotery: {
        type: String,
        require: false
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports = model('Raffle', RaffleSchema)