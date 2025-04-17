const mongoose = require('mongoose');

const breedSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: 'Wool'
  },
});

const Breed = mongoose.model('Breed', breedSchema);

module.exports = Breed;
