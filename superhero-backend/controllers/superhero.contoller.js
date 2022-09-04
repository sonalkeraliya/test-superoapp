const SuperHero = require('../models/superhero.model')

// Create and Save a new SuperHero
exports.createHero = async (req, res) => {
  
    const superhero = new SuperHero({
      name: req.body.name,
      powerstats: req.body.powerstats,
      image: req.body.image,     
    })
   
    try {
      const newSuperHero = await superhero.save()
      res.status(201).json(newSuperHero)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
}

// Update a Super Hero by the id in the request
exports.updateHero = async (req, res, next) => {
    
    let superhero
    try {
        superhero = await SuperHero.findById(req.params.id)
        if (superhero == null) {
        return res.status(404).json({ message: 'Cannot find superhero' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.superhero = superhero
    next()
} 
// Retrieve all Favourite SuperHero from the database.

exports.findAllHero = async (req, res) => {
    try {
      const superheros = await SuperHero.find()
      res.json(superheros)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
}

// Find a single super Hero with an id
exports.findOneHero = async (req, res, next) => {
  let superhero
  try {
    superhero = await SuperHero.findById(req.params.id) 
    if (superhero == null) {
      return res.status(404).json({ message: 'Cannot find SuperHero' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.superhero = superhero
  next()
}

// Delete a Super Hero with the specified id in the request

exports.deleteHero = async (req, res) => {
   
    try {
      await SuperHero.findByIdAndRemove(req.params.id)
      res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
}