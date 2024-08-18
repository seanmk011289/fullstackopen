const Filter = ({ newFilter, handleNewFilter }) => {
  return (
    <>
      <h3>Filter:</h3>
      <input value={newFilter} onChange={handleNewFilter} />
    </>
  );
};

export default Filter;
