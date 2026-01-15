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