import Hello from "../components/Hello.jsx";
const App = () => {
  const names = ["Charlie", "Sam"];
  return (
    <div>
      {names.map((name, i) => {
        return <Hello name={name} key={i} num={i}></Hello>;
      })}
    </div>
  );
};

export default App;
