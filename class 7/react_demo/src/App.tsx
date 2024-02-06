import { useState, useEffect } from "react";
import { useAudio } from "react-use";

function sum(x: number, y: number): number {
  return x + y;
}


function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function sync(event) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("mousemove", sync);
    return () => window.removeEventListener("mousemove", sync);
  }, []);

  return mousePosition;
}

function Demo() {
  const [audio, state, controls] = useAudio({
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    autoPlay: true,
  });

  return (
    <div>
      {audio}
      <button onClick={controls.pause}>Pause</button>
      <button onClick={controls.play}>Play</button>
      <br />
      <button onClick={controls.mute}>Mute</button>
      <button onClick={controls.unmute}>Un-mute</button>
      <br />
      <button onClick={() => controls.volume(0.1)}>Volume: 10%</button>
      <button onClick={() => controls.volume(0.5)}>Volume: 50%</button>
      <button onClick={() => controls.volume(1)}>Volume: 100%</button>
      <br />
      <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button>
    </div>
  );
}

function App() {
  const { x, y } = useMousePosition();

  return (
    <div>
      <h1>Counters</h1>
      <p>x: {x}</p>
      <p>y: {y}</p>
      <Demo />
    </div>
  );
}

export { App };
