const Person = ({ newFilter, persons, filtered }) => {
  return (
    <>
      <h2>Numbers</h2>
      {newFilter == ""
        ? persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : filtered.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </>
  );
};

export default Person;
