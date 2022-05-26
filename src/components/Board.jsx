import React, { useEffect, useState } from "react";
import "./board.css";
import { Chance } from "chance";
import Summary from "./Summary";

const Board = () => {
  const [squares, setSquares] = useState([]);
  const [picked, setPicked] = useState([]);
  const [bet, setBet] = useState("");
  const [isSummary, setIsSummary] = useState(false);
  const [error, setError] = useState(null);
  const chance = new Chance();
  const mostPopularStakes = ["50", "100", "200", "500", "1000"];
  const pickLimit = 5;
  useEffect(() => {
    let boardSquares = [];
    for (let i = 1; i <= 80; i++) {
      boardSquares.push(i);
    }
    setSquares(boardSquares);
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    let data = +e.target.dataset.index;
    if (picked.length < pickLimit && !picked.includes(data)) {
      let numPicked = picked.slice(0);
      numPicked.push(data);
      setPicked(numPicked);
      setIsSummary(false);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setBet(e.target.value);
  };

  const handlePlaceBet = () => {
    if (picked.length < pickLimit) {
      return setError("CHOOSE FIVE NUMBERS");
    }
    if (bet === "") {
      return setError("MAKE A BET");
    }
    setIsSummary(true);
    setPicked([]);
    setBet("");
    setError("");
  };
  const handleLuckyPick = () => {
    const randomNumber = chance.unique(chance.natural, pickLimit, {
      min: 1,
      max: 80,
    });
    setPicked(randomNumber);
    setIsSummary(false);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>KENO</h1>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      {isSummary && <Summary />}
      <div className="container">
        {squares.map((square, index) =>
          picked.includes(square) ? (
            <div key={index} className={"numbers picked"}>
              {square}
            </div>
          ) : (
            <div
              key={index}
              onClick={handleClick}
              className={"numbers"}
              data-index={index + 1}
            >
              {square}
            </div>
          )
        )}
        <div>
          <button onClick={handleLuckyPick}>Lucky Pick</button>
        </div>
        <div>
          <input
            type="number"
            placeholder={"your bet"}
            value={bet}
            onChange={handleChange}
          />
          {mostPopularStakes.map((stake, index) => (
            <button key={index} onClick={() => setBet(stake)}>
              {stake}
            </button>
          ))}
        </div>
        <button className="betBtn" style={{}} onClick={handlePlaceBet}>
          Place Bet
        </button>
      </div>
    </>
  );
};

export default Board;
