const express = require('express');
const router = express.Router();

const Breed = require('../models/breed.js');
const Sheep = require('../models/sheep.js');

// Get a list of all breeds
router.get('/', async (req, res) => {

    try {
        // Look up all breeds
        const allBreeds = await Breed.find();

        res.render('breed/index.ejs',{
            title: "All Breeds of Sheep",
            breeds: allBreeds,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

 });

 // Get All Sheep By BreedId
 router.get('/:breedId', async (req, res) => {

    try {
        // Look up the breed
        const oneBreed = await Breed.findById(req.params.breedId);

        // Look all the individual sheep by breedId
        const theHerd = await Sheep.find({breed: req.params.breedId}).populate("breed");

        res.render('breed/indexSheepByBreed.ejs',{
            title: "The " + oneBreed.name,
            breed: oneBreed,
            sheep: theHerd
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

 });


module.exports = router;