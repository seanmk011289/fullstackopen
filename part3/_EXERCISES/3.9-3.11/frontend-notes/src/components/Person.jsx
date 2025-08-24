const Person = ({ name, number, id, remove }) => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p style={{ margin: "10px 0px" }}>
          {name} {number}
        </p>{" "}
        <button
          onClick={() => remove(id, name)}
          style={{
            background: "none",
            color: "red",
            border: "none",
            cursor: "pointer",
            padding: "0px",
            height: "100%",
          }}
        >
          delete
        </button>
      </div>
    </>
  );
};

export default Person;
