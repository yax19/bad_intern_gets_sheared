const mongoose = require('mongoose');

const sheepSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shorn: {
    type: Boolean,
    default: false
  },
  breed: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Breed', 
    required: true
  },
});

const Sheep = mongoose.model('Sheep', sheepSchema);

module.exports = Sheep;
