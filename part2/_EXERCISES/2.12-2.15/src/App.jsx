// import { useState, useEffect } from "react";
// import Note from "./components/Note";
// import noteService from "./services/notes";
// console.log(noteService);

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState("new note here...");
//   const [showTrue, setShowTrue] = useState(false);

//   const toggleImportanceOf = (id) => {
//     const note = notes.find((n) => n.id === id);
//     const changedNote = { ...note, important: !note.important };
//     noteService
//       .update(id, changedNote)
//       .then((returnedNote) => {
//         setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
//       })
//       .catch((err) => {
//         alert(`The note ${note.content} was already deleted from the server`);
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

//// PHONEBOOK CODE

import { useState, useEffect } from "react";
import People from "./components/People";
import Phoneform from "./components/Phoneform";
import Filter from "./components/Filter";
import axios from "axios";

import { getNumbers, addNumber, removeNumber } from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getNumbers().then((phonebook) => {
      setPersons(phonebook);
    });
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
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
    } else {
      alert(`${newName} has already been added to the phonebook`);
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
