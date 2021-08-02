const mongoose = require('mongoose')

// https://mongoosejs.com/docs/guide.html
// https://mongoosejs.com/docs/validation.html

const PlayerSchema = new mongoose.Schema({
  username: {
    type:String,
    required:[true, 'must provide name'], // makes it so if the property is empty, we get an error
    trim:true,
    maxlength:[20, 'username cannot be more than 20 characters'] // basic validators
  },
  skill_level: {
    type: Number,
    min: 0, max:100,
    required:[true, 'Must provide skill level.']
  },
  waiting: {
    type: Boolean,
    default: true
  }
})

module.exports = {schema:PlayerSchema, model:mongoose.model('Player', PlayerSchema)}
