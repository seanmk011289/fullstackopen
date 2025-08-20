import Person from "./Person";

const People = ({ newFilter, persons, filtered, remove }) => {
  return (
    <>
      <h2>Numbers</h2>
      {newFilter == ""
        ? persons.map((person) => (
            <Person
              key={person.id}
              name={person.name}
              number={person.number}
              remove={remove}
              id={person.id}
            ></Person>
          ))
        : filtered.map((person) => (
            // <p key={person.id}>
            //   {person.name} {person.number}
            // </p>
            <Person
              key={person.id}
              name={person.name}
              number={person.number}
              remove={remove}
              id={person.id}
            ></Person>
          ))}
    </>
  );
};

export default People;
