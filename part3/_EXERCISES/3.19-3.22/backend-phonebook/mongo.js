const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://seanmk011289:${password}@fullstack-notes.pnlw9id.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstack-notes`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonenumberSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Number = mongoose.model('Number', phonenumberSchema)

// if only password is given → list entries
if (process.argv.length < 4) {
  console.log('phonebook')
  Number.find({}).then(numbers => {
    numbers.forEach(n => console.log(`${n.name}: ${n.number}`))
    mongoose.connection.close()
  })
}
// if password, name, number are given → save new entry
else if (process.argv.length === 5) {
  const num = new Number({
    name: name,
    number: number,
  })

  num.save().then(() => {
    console.log(`${name} ${number} saved to phonebook`)
    mongoose.connection.close()
  })
}
// otherwise → wrong usage
else {
  console.log('Usage:\nnode mongo.js <password> [<name> <number>]')
  mongoose.connection.close()
}
