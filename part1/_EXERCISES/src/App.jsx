// const Header = (props) => {
//   return (
//     <>
//       <h1>{props.course}</h1>
//     </>
//   );
// };

// const Part = (props) => {
//   return (
//     <>
//       <p>
//         {props.name} {props.exercise}
//       </p>
//     </>
//   );
// };

// const Content = (props) => {
//   return (
//     <>
//       <Part
//         name={props.parts[0].name}
//         exercise={props.parts[0].exercises}
//       ></Part>
//       <Part
//         name={props.parts[1].name}
//         exercise={props.parts[1].exercises}
//       ></Part>
//       <Part
//         name={props.parts[2].name}
//         exercise={props.parts[2].exercises}
//       ></Part>
//     </>
//   );
// };

// const Total = (props) => {
//   return (
//     <>
//       <p>
//         Number of exercises{" "}
//         {props.parts[0].exercises +
//           props.parts[1].exercises +
//           props.parts[2].exercises}
//       </p>
//     </>
//   );
// };

// const App = () => {
//   const course = "Half Stack application development";
//   const parts = [
//     {
//       name: "Fundamentals of React",
//       exercises: 10,
//     },
//     {
//       name: "Using props to pass data",
//       exercises: 7,
//     },
//     {
//       name: "State of a component",
//       exercises: 14,
//     },
//   ];

//   return (
//     <div>
//       <Header course={course}></Header>
//       <Content parts={parts}></Content>
//       <Total parts={parts}></Total>
//     </div>
//   );
// };

// export default App;

// import { useState } from "react";

// const App = () => {
//   const [counter, setCounter] = useState(0);
//   // console.log(counter);
//   const handleClick = () => {
//     setCounter(counter + 1);
//   };

//   return (
//     <>
//       <p>{counter}</p>
//       <button onClick={handleClick}>Increase now please</button>
//     </>
//   );
// };

// export default App;

//////// CAMPUS RESTAURANT REVIEW EXERCISE /////////////

// import { useState } from "react";

// const Button = ({ handleClick, text }) => {
//   return <button onClick={handleClick}>{text}</button>;
// };

// const StatisticLine = ({ text, stat }) => {
//   return (
//     <tr>
//       <td>{text}</td>
//       <td>{stat}</td>
//     </tr>
//   );
// };

// const Statistics = ({ good, neutral, bad, all, avg }) => {
//   if (all === 0) {
//     return <h3>No feedback given</h3>;
//   }
//   return (
//     <section className="feedbackStats">
//       <h2>Stats Table</h2>
//       <table>
//         <tbody>
//           {/* <h3>Good: {good}</h3> */}
//           <StatisticLine text="Good" stat={good}></StatisticLine>
//           {/* <h3>Neutral: {neutral}</h3> */}
//           <StatisticLine text="Neutral" stat={neutral}></StatisticLine>
//           {/* <h3>Bad: {bad}</h3>  */}
//           <StatisticLine text="Bad" stat={bad}></StatisticLine>
//           {/* <h3>All: {all}</h3> */}
//           <StatisticLine text="All" stat={all}></StatisticLine>
//           {/* <h3>Average: {all > 0 ? (avg / all).toFixed(2) : 0}</h3> */}
//           <StatisticLine
//             text="Average"
//             stat={all > 0 ? (avg / all).toFixed(2) : 0}
//           ></StatisticLine>
//           {/* <h3>Positive: {all > 0 ? `${Math.round((good / all) * 100)}%` : 0}</h3> */}
//           <StatisticLine
//             text="Positive"
//             stat={all > 0 ? `${Math.round((good / all) * 100)}%` : 0}
//           ></StatisticLine>
//         </tbody>
//       </table>
//     </section>
//   );
// };

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);
//   const [all, setAll] = useState(0);
//   const [avg, setAvg] = useState(0);
//   // const [posTotal, setPosTotal] = useState(0);

//   const goodClick = () => {
//     setGood(good + 1);
//     setAll(all + 1);
//     setAvg(avg + 1);
//   };

//   const neutralClick = () => {
//     setNeutral(neutral + 1);
//     setAll(all + 1);
//   };

//   const badClick = () => {
//     setBad(bad + 1);
//     setAll(all + 1);
//     setAvg(avg - 1);
//   };

//   return (
//     <>
//       <section className="feedbackBtns">
//         <h2>Give Feedback</h2>
//         <Button text="good" handleClick={goodClick}></Button>
//         <Button text="neutral" handleClick={neutralClick}></Button>
//         <Button text="bad" handleClick={badClick}></Button>
//       </section>
//       <Statistics
//         good={good}
//         neutral={neutral}
//         bad={bad}
//         all={all}
//         avg={avg}
//       ></Statistics>
//     </>
//   );
// };

// export default App;

//////// END CAMPUS RESTAURANT REVIEW EXERCISE /////////////

///////////////////// ANECDOTES EXERCISE ///////////////////////////

import { useState } from "react";

const App = () => {
  const anecdotes = [
    {
      text: "If it hurts, do it more often.",
      voteCount: 0,
    },
    {
      text: "Adding manpower to a late software project makes it later!",
      voteCount: 0,
    },
    {
      text: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      voteCount: 0,
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      voteCount: 0,
    },
    {
      text: "Premature optimization is the root of all evil.",
      voteCount: 0,
    },
    {
      text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      voteCount: 0,
    },
    {
      text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      voteCount: 0,
    },
    {
      text: "The only way to go fast, is to go well.",
      voteCount: 0,
    },
  ];

  const [selected, setSelected] = useState(0);
  const [anes, setAnes] = useState(anecdotes);
  const [voteCount, setVoteCount] = useState(0);
  const [tote, setTote] = useState(false);
  const [sort, setSort] = useState("");

  const rando = () => {
    let length = anes.length;
    let random = Math.floor(Math.random() * length);
    setSelected(random);
    setVoteCount(anes[random].voteCount);
  };

  const vote = () => {
    let newArr = anes.map((ane, index) => {
      if (selected === index) {
        return {
          ...ane,
          voteCount: voteCount + 1,
        };
      }
      return ane;
    });
    setAnes(newArr);
    setVoteCount(newArr[selected].voteCount);
    setTote(true);
    // console.log(newArr.sort((x, y) => y.voteCount - x.voteCount));
    let sorty = [...newArr].sort((x, y) => y.voteCount - x.voteCount)[0].text;
    setSort(sorty);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <div>{anes[selected].text}</div>
      <div>This anecdote has {voteCount} votes</div>
      <button onClick={vote}>vote</button>
      <button onClick={rando}>next anecdote</button>

      <h2>Anecdotes with the most votes</h2>
      <p>{tote ? sort : "There haven't been any votes yet!"}</p>
    </>
  );
};

export default App;
