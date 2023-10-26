import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (e) => setKeyword(e.target.value);

  useEffect(() => {
    console.log("I run only once");
  }, []);
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when 'keyword & counter' changes.");
  }, [keyword, counter]);

  const [showing, setShowing] = useState(false);
  function Hello() {
    useEffect(() => {
      console.log("hi :)");
      return () => console.log("bye :(");
    }, []);

    return <h1>Hello</h1>;
  }

  const onToggle = () => setShowing((prev) => !prev);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search herr..."
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>

      {showing ? <Hello /> : null}
      <button onClick={onToggle}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
