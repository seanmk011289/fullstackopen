// // NOTES CODE

// import { useState, useEffect } from "react";
// import Note from "./components/Note";
// import Notification from "./components/Notification";
// import noteService from "./services/notes";
// console.log(noteService);

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState("new note here...");
//   const [showTrue, setShowTrue] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const toggleImportanceOf = (id) => {
//     const note = notes.find((n) => n.id === id);
//     const changedNote = { ...note, important: !note.important };
//     noteService
//       .update(id, changedNote)
//       .then((returnedNote) => {
//         setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
//       })
//       .catch((err) => {
//         setErrorMessage(
//           `Note '${note.content}' was already removed from server`
//         );
//         setTimeout(() => {
//           setErrorMessage(null);
//         }, 5000);
//         setNotes(notes.filter((n) => n.id !== id));
//       });
//   };

//   useEffect(() => {
//     noteService.getAll().then((initialNotes) => {
//       setNotes(initialNotes);
//     });
//   }, []);

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       important: Math.random() > 0.5,
//     };

//     noteService.create(noteObject).then((x) => {
//       setNotes(notes.concat(x));
//       setNewNote("");
//     });
//   };

//   const handleNewNote = (e) => {
//     setNewNote(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Notes</h1>
//       <Notification message={errorMessage} />
//       <ul>
//         {showTrue
//           ? notes
//               .filter((note) => note.important)
//               .map((note) => (
//                 <Note
//                   key={note.id}
//                   note={note}
//                   toggleImportance={() => toggleImportanceOf(note.id)}
//                 />
//               ))
//           : notes.map((note) => {
//               return (
//                 <Note
//                   key={note.id}
//                   note={note}
//                   toggleImportance={() => toggleImportanceOf(note.id)}
//                 />
//               );
//             })}
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNewNote} />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   );
// };

// export default App;

// PHONEBOOK CODE

import { useState, useEffect } from "react";
import People from "./components/People";
import Phoneform from "./components/Phoneform";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Error from "./components/Error";

import {
  getNumbers,
  addNumber,
  removeNumber,
  editNumber,
} from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Getting all the numbers from the database
  useEffect(() => {
    getNumbers().then((phonebook) => {
      setPersons(phonebook);
    });
  }, []);

  // Handling new name information in the form
  const handleNewName = (e) => {
    setNewName(e.target.value);
    console.log(newName)
  };

  // Handling new number information
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
    console.log(newNumber);
  };

  const handleNewFilter = (e) => {
    setNewFilter(e.target.value.toLowerCase());
    let filteredArr = persons.filter((person) => {
      return person.name.toLowerCase().match(e.target.value.toLowerCase());
    });
    setFiltered(filteredArr);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.every(
        (listing) => listing.name.toLowerCase() != newName.toLowerCase()
      )
    ) {
      addNumber(newPerson).then((newNum) => {
        setPersons([...persons, newNum]);
        setNewName("");
        setNewNumber("");
      });
      // setPersons([...persons, { name: newName, number: newNumber }]);
      setMessage(`${newName} has been added to the phonebook!`);
      setTimeout(() => setMessage(null), 3000);
    } else {
      if (
        window.confirm(
          `${newName} already has a number listed. Change their number?`
        )
      ) {
        let p = persons.find((person) => person.name === newName);
        editNumber(p, newNumber)
          .then((newPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === newPerson.id ? newPerson : person
              )
            );
          })
          .catch((err) => {
            setErrorMsg(`${err}`);
            setTimeout(() => setErrorMsg(null), 3000);
          });
      }
      setNewName("");
      setNewNumber("");
    }
  };

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      removeNumber(id).then(() => {
        const filteredPersons = [...persons].filter(
          (person) => person.id !== id
        );
        setPersons(filteredPersons);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <Error errorMsg={errorMsg}></Error>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}></Filter>
      <Phoneform
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      ></Phoneform>
      <People
        newFilter={newFilter}
        persons={persons}
        filtered={filtered}
        remove={handleRemove}
      ></People>
    </div>
  );
};

export default App;