import React, { useState } from "react";
import "./App.css";

const Die = ({ value, isHeld, holdDie }) => {
  return (
    <div className={`die ${isHeld ? "held" : ""}`} onClick={holdDie}>
      {value}
    </div>
  );
};

const App = () => {
  const [dice, setDice] = useState(generateNewDice());
  const [tenzi, setTenzi] = useState(false);

  function generateNewDice() {
    return Array.from({ length: 12 }, () => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function rollDice() {
    if (!tenzi) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateNewDice());
      setTenzi(false);
    }
  }

  function holdDie(index) {
    setDice((oldDice) =>
      oldDice.map((die, i) =>
        i === index ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzi(true);
    }
  }, [dice]);

  return (
    <div className="App">
      <h1>Tenzi Game</h1>
      <div className="dice-container">
        {dice.map((die, index) => (
          <Die
            key={index}
            value={die.value}
            isHeld={die.isHeld}
            holdDie={() => holdDie(index)}
          />
        ))}
      </div>
      <button className="roll-button" onClick={rollDice}>
        {tenzi ? "New Game" : "Roll"}
      </button>
      {tenzi && <h2>You won!</h2>}
    </div>
  );
};

export default App;
