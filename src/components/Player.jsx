import { useState, useRef } from "react";

export default function Player() {
  const inputRef = useRef();
  const [playerName, setPlayerName] = useState(null);

  function handleClick () {
    setPlayerName(inputRef.current.value);
    inputRef.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'Unknown entity'}</h2>
      <p>
        <input ref={inputRef} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
