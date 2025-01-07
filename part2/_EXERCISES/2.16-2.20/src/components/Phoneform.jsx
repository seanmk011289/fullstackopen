const Phoneform = ({
  addPerson,
  handleNewName,
  handleNewNumber,
  newName,
  newNumber,
}) => {
  return (
    <>
      <h3>Add New</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
          <div>
            number: <input value={newNumber} onChange={handleNewNumber} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Phoneform;
