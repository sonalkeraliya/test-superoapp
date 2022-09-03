const mongoose = require('mongoose')

const superheroSchema = new mongoose.Schema({
  name: {
    type: String,
    require : true
  },
  image: {
    url: {
        type: String,
        require : true
    }
    
  },
  powerstats: {
    combat: {
        type: Number
    },
    durability: {
        type: Number
    },
    intelligence: {
        type: Number
    },
    power: {
        type: Number
    },
  } 
})

module.exports = mongoose.model('SuperHero', superheroSchema)