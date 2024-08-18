// import { useState } from "react";
// import Note from "./components/Note";

// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes);
//   const [newNote, setNewNote] = useState("new note here...");
//   const [showTrue, setShowTrue] = useState(true);

//   const addNote = (e) => {
//     e.preventDefault();
//     const notesObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: String(notes.length + 1),
//     };
//     setNotes(notes.concat(notesObject));
//     setNewNote("");
//   };

//   const handleNewNote = (e) => {
//     console.log(e.target.value);
//     setNewNote(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {showTrue
//           ? notes
//               .filter((note) => note.important)
//               .map((note) => <Note key={note.id} note={note} />)
//           : notes.map((note) => {
//               console.log(note.important);
//               return <Note key={note.id} note={note} />;
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

import { useState } from "react";
import Person from "./components/Person";
import Phoneform from "./components/Phoneform";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

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
    if (
      persons.every(
        (listing) => listing.name.toLowerCase() != newName.toLowerCase()
      )
    ) {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} has already been added to the phonebook`);
      setNewName("");
      setNewNumber("");
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
      <Person
        newFilter={newFilter}
        persons={persons}
        filtered={filtered}
      ></Person>
    </div>
  );
};

export default App;
