const express = require('express')
const router = express.Router()
const superheros = require('../controllers/superhero.contoller.js')


 // Create a new SuperHero
 router.post("/", superheros.createHero);

 // Update a Super Hero with id
 router.put("/:id", superheros.updateHero);

  //Retrieve all Superheros
 router.get("/", superheros.findAllHero);


 // Retrieve a single Super Hero with id
 router.get("/:id", superheros.findOneHero);
 
 // Delete a Super Hero with id
 router.delete("/:id", superheros.deleteHero); 

module.exports = router