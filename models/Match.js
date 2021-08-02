const mongoose = require('mongoose')
const {schema:PlayerSchema} = require('../models/Player')

function getDate () {
    const currentdate = new Date();
    return currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds()
}

const MatchesSchema = new mongoose.Schema({
    player_one: {
        type: PlayerSchema,
        required:[true, 'must provide player_one PlayerSchema'], // makes it so if the property is empty, we get an error
    },
    player_two: {
        type: PlayerSchema,
        required:[true, 'must provide player_one PlayerSchema'], // makes it so if the property is empty, we get an error
    },
    date: {
        type: String,
        default: getDate()
    }
})

module.exports = {model:mongoose.model('Match', MatchesSchema)}
