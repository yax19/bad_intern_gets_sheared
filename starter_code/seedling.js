const Sheep = require('./models/sheep');
const Breed = require('./models/breed');


const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

const SALT_LENGTH = 12;


// Function to check for seeding
async function isSeeded(){
    // Get the animals

    const animals = await Sheep.findOne({})

    // If no animals
    if(!animals){
        // Not seeded
        return false;
    }else{
    // Else seeded
        return true;

    }

}

// Do the Seeding
async function runSeeder(){
    // Check if needed to be seeded

    const isDBSeeded = await isSeeded();

    if(isDBSeeded && process.argv.indexOf('-reseed') == -1){
        // DB is already seeded, do not reseed
        console.log("Database already seeded")
        return false;
    }else{
        console.log("Starting database seed")
    }

    const startTime = Date.now();
    const dirPath = path.join(__dirname,  'seeddata');

    
    console.log("Seeding Breeds")

    await Breed.deleteMany({});

    // Create the breeds from breeds.json
    const jsonSpeciesFile = fs.readFileSync(path.join(dirPath, "breeds.json"), 'utf8');
    const jsonSpeciesData = JSON.parse(jsonSpeciesFile);

        // Loop through each
        for (let i = 0; i < jsonSpeciesData.length; i++) {
            // Create Species
            const newSpecies = {
                name: jsonSpeciesData[i]['name'],
                type: jsonSpeciesData[i]['type']
            }

            // Save Species
            const user = await Breed.create(newSpecies)
        }

    // Get all species
    const breeds = await Breed.find({});


    console.log("Seeding Breeds Complete: ", Date.now() - startTime)


   

    console.log("Seeding Sheep")

    // Clear animals
    await Sheep.deleteMany({});

    // Choose number of animals
    const animalCount = 172;
    

    // Generate the unique names for all the animals
    const animalNames = [];
    let nameLoopCount = 0;

    while(animalNames.length < animalCount){
        const newName = faker.person.firstName();
        if(animalNames.indexOf(newName) == -1){
            animalNames.push(newName);
        }
        nameLoopCount++;
        if(nameLoopCount > animalNames * 10){
            break;
        }
    }


    // Use faker to create animals
    for(let i=0; i<animalNames.length; i++){
        // Choose a species
        const speciesIndex = Math.floor(Math.random() * breeds.length)
        const speciesID = breeds[speciesIndex]['_id'];

        // Has it been sheared
        const coinflip = Math.round(Math.random());

        // Create the animal
        const newAnimal = {
            name: animalNames[i],
            breed: speciesID,
            shorn: coinflip
        }
        
        const animal = await Sheep.create(newAnimal)

    }
    console.log("Seeding Sheep Complete: ", Date.now() - startTime)

    console.log("Seeding Complete With Duration: ", Date.now() - startTime)
    return true;
    }
       

    module.exports = runSeeder;