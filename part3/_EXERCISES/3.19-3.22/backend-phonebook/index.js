///////////// PHONEBOOK BACKEND

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const Number = require('./models/phone');

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.static('dist'));

const PORT = process.env.PORT || 3001

app.get('/', (request, response) => {
  response.send(`<h1>Hello World!</h1><h3>Ur A Bitch from Port Number ${PORT}</h3>`)
})

app.get('/api/persons', (request, response) => {
  Number.find({})
    .then(numbers => {
      response.json(numbers);
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/api/persons/:id', (request, response, next) => { 
  Number.findById(request.params.id)
    .then(person => {

      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

    .catch(error => {
      console.log(error);
      // response.status(400).send({ error: 'malformatted id' })
      next(error);
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Please add a name and number' 
    })
  }

  const person = new Number({
    name: body.name,
    number: body.number
  })

  person.save().then((savedRecord) => {
    response.json(savedRecord)
  }).catch(err => next(err))
});

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body;

  Number.findById(request.params.id)
    .then(num => {
      if (!num) {
        return response.status(404).end()
      }
      num.name = name;
      num.number = number;

      return num.save().then((updatedNumber) => {
        response.json(updatedNumber)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log(id);
;  Number.findByIdAndDelete(id).then(result => {
    console.log(result)
    response.status(204).end();
  }).catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error);
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})