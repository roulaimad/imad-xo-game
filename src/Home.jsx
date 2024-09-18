import React, { useEffect, useState } from "react";
import "./home.css";

function Home() {
  const [boxArray, setBoxArray] = useState(
    Array.from({ length: 9 }, (v, i) => ({
      index: i + 1,
      symbol: "",
    }))
  );

  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  useEffect(() => {
    updateXOCombinations();
  }, [boxArray]);
  const updateXOCombinations = () => {
    // =====================Update X Combinations
    const xCombination = boxArray
      .map((box) => {
        return box.symbol === false ? box.index : "";
      })
      .filter((index) => index !== "");
    // =======================Update O Combinations
    const oCombination = boxArray
      .map((box) => {
        return box.symbol === true ? box.index : "";
      })
      .filter((index) => index !== "");
    // ======================Log Combinations
    isWinning(xCombination, oCombination);
  };

  //===========================================================================
  const isWinning = (xCombination, oCombination) => {
    winningCombinations.map((combination) => {
      if (combination.every((digit) => xCombination.includes(digit))) {
        Win("X");
      }
      if (combination.every((digit) => oCombination.includes(digit))) {
        Win("O");
      }
    });
  };
  //===========================================================================
  const Win = (Winner) => {
    alert(`${Winner} Wins!`);
  };
  //===========================================================================
  const [nextSymbol, setNextSymbol] = useState(true);
  const handleBoxClick = (index) => {
    setBoxArray((prevBoxArray) =>
      prevBoxArray.map((box) =>
        box.index === index && box.symbol === ""
          ? { ...box, symbol: nextSymbol }
          : box
      )
    );
    const boxClicked = boxArray.find((box) => box.index === index);
    setNextSymbol(boxClicked.symbol === "" ? !nextSymbol : nextSymbol);
  };

  return (
    <div className="home-container">
      {boxArray.map((box) => (
        <div
          key={box.index}
          className="box"
          onClick={() => {
            handleBoxClick(box.index);
          }}
        >
          <div className="box-symbol">
            {box.symbol === "" ? "" : box.symbol ? "O" : "X"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
