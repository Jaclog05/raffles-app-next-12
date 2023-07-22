const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: false
    },
    address: {
        type: String,
        require: true
    },
    cellPhone: {
        type: String,
        require: true
    },
    idType: {
        type: String,
        require: true
    },
    idNum: {
        type: Number,
        require: true
    }
})

module.exports = model('User', UserSchema)