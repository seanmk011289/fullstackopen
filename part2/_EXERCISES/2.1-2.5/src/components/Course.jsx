const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts.reduce((x, y) => {
          return x + y.exercises;
        }, 0)}
      </p>
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => {
        return (
          <Part
            name={part.name}
            exercises={part.exercises}
            key={part.name}
          ></Part>
        );
      })}
    </>
  );
};

const Course = ({ parts, course }) => {
  return (
    <>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </>
  );
};

export default Course;
