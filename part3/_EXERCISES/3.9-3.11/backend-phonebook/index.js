///////////// PHONEBOOK BACKEND

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static('dist'));

// let notes = [  {    id: "1",    content: "HTML is easy",    important: true  },  {    id: "2",    content: "Browser can execute only JavaScript",    important: false  },  {    id: "3",    content: "GET and POST are the most important methods of HTTP protocol",    important: true  }]
let persons = [
    {
      name: "John McCarthy",
      number: "7853838806",
      id: "QFHwNzj"
    },
    {
      name: "Sean Kennedy",
      number: "7853838804",
      id: "Gg-0L4j"
    },
    {
      name: "Charlie Hooper",
      number: "7853838809",
      id: "PROVYRZ"
    }
  ]

const PORT = process.env.PORT || 3001

app.get('/', (request, response) => {
  response.send(`<h1>Hello World!</h1><h3>Ur A Bitch from Port Number ${PORT}</h3>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
} else {
    response.status(404).end();
}
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Please add a name and number' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  console.log(request.body);
  console.log(persons);
  response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//////////// NOTES BACKEND ENDING

// -----------------------------------------------------------

// // //////////// PHONEBOOK BACKEND

// const express = require("express");
// const morgan = require("morgan");
// const app = express();

// app.use(express.json());
// // app.use(morgan('tiny'));
// function postOnlyLogger(tokens, req, res) {
//       if (req.method === 'POST') {
//         // You can customize the log format here
//         return [
//           tokens.method(req, res),
//           tokens.url(req, res),
//           tokens.status(req, res),
//           tokens.res(req, res, 'content-length'), '-',
//           tokens['response-time'](req, res), 'ms',
//           JSON.stringify(req.body)
//         ].join(' ');
//       } else {
//         return [
//           tokens.method(req, res),
//           tokens.url(req, res),
//           tokens.status(req, res),
//           tokens.res(req, res, 'content-length'), '-',
//           tokens['response-time'](req, res), 'ms'
//         ].join(' ');
//       }
//       return null; // Don't log for other methods
//     }

//     // Use the custom format function with app.use(morgan)
//     app.use(morgan(postOnlyLogger));

// const PORT = 3001;

// let numbers = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// let lowerCaseNames = numbers.map(number => number.name.toLowerCase().replace(/\s/g, ""));
// console.log(lowerCaseNames);

// app.get("/api/persons", (req, res) => {
//     res.send(numbers);
// })

// app.get("/api/persons/:id", (req, res) => {
//     let id = req.params.id;
//     let person = numbers.find(number => number.id == id);
//     if(!person) {
//         res.status(404).send("Could not find the person you're looking for.")
//     }
//     res.send(person);
// })

// app.get("/info", (req, res) => {
//     res.send(
//         `Phonebook has info for ${numbers.length} people.
//         <br><br>
//         ${new Date().toString()}`
//     )
// })

// app.post("/api/persons", (req, res) => {
//     const newNum = {
//         id: String(Math.floor(Math.random() * 1000000000)),
//         name: req.body.name,
//         number: String(req.body.number)
//     }
//     let lowerCase = req.body.name.toLowerCase().replace(/\s/g, "");
//     if(req.body.name == "" || req.body.number == "") {
//         res.status(400).send(`error: {'Name and number must both be present to add.'}`).end();
//     }
//     else if(lowerCaseNames.includes(lowerCase)) {
//         res.status(400).send(`error: {'${req.body.name} already exists. The name must be unique.'}`).end();
//     } else {
//         numbers = numbers.concat(newNum);
//         res.status(200).send(numbers).end();
//     }
// })

// app.delete("/api/persons/:id", (req, res) => {
//     let id = req.params.id;
//     let n = numbers.find(number => number.id == id);
//     numbers = numbers.filter(number => number.id !== id)
//     console.log(`${n.name} has been deleted`);
//     res.status(204).send(`${n.name} has been deleted`).end()
// })

// app.listen(PORT, () => {
//     console.log(`Server running on Port ${PORT}`);
// })


// // ////////////// PHONEBOOK BACKEND