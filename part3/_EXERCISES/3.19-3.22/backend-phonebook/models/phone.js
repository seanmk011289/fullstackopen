require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URL

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    console.log("connected to mongo!")
}).catch(err => {
    console.log(err);
});

const phonenumberSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength: 3,
    required: true
  },
  number: String
})

phonenumberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Number = mongoose.model('Number', phonenumberSchema);

// if only password is given → list entries
// if (process.argv.length < 4) {
//     console.log("phonebook")
//   Number.find({}).then(numbers => {
//     numbers.forEach(n => console.log(`${n.name}: ${n.number}`));
//     mongoose.connection.close();
//   });
// }
// // if password, name, number are given → save new entry
// else if (process.argv.length === 5) {
//   const num = new Number({
//     name: name,
//     number: number,
//   });

//   num.save().then(() => {
//     console.log(`${name} ${number} saved to phonebook`)
//     mongoose.connection.close();
//   });
// }
// // otherwise → wrong usage
// else {
//   console.log('Usage:\nnode mongo.js <password> [<name> <number>]')
//   mongoose.connection.close();
// }

module.exports = Number;