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
  number: {
    type:String,
    minLength:8,
     validate: [
      {
        validator: function(v) {
          // Check that the value is not empty
          return v && v.trim().length > 0;
        },
        message: 'Phone number cannot be empty'
      },
      {
        validator: function(v) {
          // Check that it only contains digits, dashes, and periods
          return /^[\d\.\-]+$/.test(v);
        },
        message: 'Phone number can only contain digits, dashes, and periods'
      },
      {
        validator: function(v) {
          // Strip all non-digit characters and verify exactly 10 digits
          const digitsOnly = v.replace(/\D/g, '');
          return digitsOnly.length === 10;
        },
        message: 'Phone number must contain exactly 10 digits'
      }
    ]
  }
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