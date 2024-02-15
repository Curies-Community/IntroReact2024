import { useEffect, useState } from "react";

function Blink({ children, time }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const flip = () => setShow((currentShow) => !currentShow);
    console.log("haciendo interval cada ", time);
    const id = setInterval(flip, time);
    return () => {
      clearInterval(id);
      console.log("limpiando el interval de cada ", time);
    };
  }, [time]);

  return (
    <div
      style={{
        backgroundColor: "yellow",
        border: "1px solid black",
        padding: "10px",
        visibility: show ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [inputTime, setInputTime] = useState(1000);
  const [exist, setExist] = useState(true);

  return (
    <section>
      {inputTime}
      <button onClick={() => setInputTime(3000)}> make input time 3000</button>
      <button onClick={() => setInputTime(9000)}> make input time 9000</button>
      <button onClick={() => setInputTime(100)}> make input time 500</button>
      <button onClick={() => setExist(false)}>desaparecer</button>
      <button onClick={() => setExist(true)}>aparecer</button>

      {exist ? (
        <Blink time={inputTime}>
          <input type="text" placeholder="Enter your name" />
        </Blink>
      ) : null}

      <button> dame click</button>
    </section>
  );
}

export { App };
