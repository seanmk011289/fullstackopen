import React from "react";

const Hello = function (props) {
  const now = new Date();
  console.log(props);
  return (
    <>
      <h1>Hey</h1>
      <h2>{props.name}</h2>
      <h3>Douche</h3>
      <p>{now.toString()}</p>
    </>
  );
};

export default Hello;
