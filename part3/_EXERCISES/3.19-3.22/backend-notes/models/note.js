const mongoose = require('mongoose');
require('dotenv').config();

// mongo connection string
const url = process.env.URL
mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(() => {
    console.log('Connected to MongoDB')
})
    .catch((err) => {
    console.log(`Couldn't connect: ${err}`)
})


const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;