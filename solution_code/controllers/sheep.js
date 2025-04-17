const express = require('express');
const router = express.Router();

const Sheep = require('../models/sheep.js');
const Breed = require('../models/breed.js');


// Shear or Unshear the Sheep
router.put('/:sheepId/mark/:shearStatus', async (req, res) => {

    try{
        // Set shear status to default of unsheared
        let sheared = false;

        // If shear status is sheared, set sheep as sheered
        if(req.params.shearStatus == "sheared"){
            sheared = true;
        }

        const oneSheep = await Sheep.findById(req.params.sheepId)

        oneSheep.shorn = sheared;

        const response = await oneSheep.save();

        // Redirect back to sheep list
        res.redirect("/sheep/");
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

});

// Remove a sheep from the herd
router.delete('/:sheepId', async (req, res) => {

    try{

        const oneSheep = await Sheep.findByIdAndDelete(req.params.sheepId)

        // Redirect back to sheep list
        res.redirect("/sheep/");
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

});

// Form to add a sheep
router.get('/new', async (req, res) => {
    // Get the list of breeds to populate the form's breed select
    const allBreeds = await Breed.find();


    res.render('sheep/new.ejs',{
        title:"Add a Sheep",
        breeds: allBreeds
    });
  });

// Add a sheep to the herd
router.post("/", async (req, res) => {

    // Create the sheep    
    const user = await Sheep.create(req.body);

    // Send the user back to the sheep list
    res.redirect('/sheep/')
  });

 // Get All Sheep
 router.get('/', async (req, res) => {

    try {

        // Look all the individual sheep by breedId
        const theHerd = await Sheep.find().populate("breed");

        res.render('sheep/index.ejs',{
            title: "The Whole Herd",
            sheep: theHerd
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

 });

module.exports = router;