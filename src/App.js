import React, { useState, useEffect } from "react";
import "./App.css";

import Preview from "./components/Preview";
import Stats from "./components/Stats";
import Button from "./components/Button";

function App() {
  const [input, setInput] = useState("");
  const [text, setText] = useState(
    "Imagine an interface where the only way to find out whether a key on the keyboard is being pressed is to read the current state of that key. To be able to react to keypresses, you would have to constantly read the keys state so that you would catch it before it is released again. It would be dangerous to perform other time-intensive computations since you might miss a keypress."
  );
  const [averageWordLength, setAverageWordLength] = useState(0);
  const [scoreCount, setScoreCount] = useState(0);
  const [scoredLetters, setScoredLetters] = useState([]);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(undefined);
  const [timerPaused, setTimerPaused] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    const words = text.split(" ");
    const length = words.join("");
    const averageWord = Math.round(length.length / words.length);
    setAverageWordLength(averageWord);
  }, [text]);

  //Start game if
  useEffect(() => {
    if (input.length > 0 && !gameStarted && !gameEnded) {
      startGame();
    }
  });

  //TIMER
  useEffect(() => {
    if (timerPaused) {
      clearInterval(timer);
    } else {
      const timerId = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
      setTimer(timerId);
    }
    return () => clearInterval(timer);
  }, [timerPaused]);

  function startGame() {
    setGameStarted(true);
    setGameEnded(false);
    setTimerPaused(false);
  }

  function inputOnChange(e) {
    if (e.target.value.length >= text.length) {
      setInput(e.target.value);
      countScore(e.target.value);
      setGameEnded(true);
      setGameStarted(false);
      setTimerPaused(true);
      e.target.setAttribute("readonly", "true");
    } else {
      setInput(e.target.value);
      countScore(e.target.value);
    }
  }

  function countScore(value) {
    if (value.length > 0) {
      if (
        value[value.length - 1] === text[value.length - 1] &&
        scoredLetters.lastIndexOf(value.lastIndexOf(value[value.length - 1])) === -1
      ) {
        setScoreCount(scoreCount + 1);
        setScoredLetters([...scoredLetters, value.lastIndexOf(value[value.length - 1])]);
      }
    }
  }

  function restartButton() {
    setInput("");
    document.querySelector("#input").removeAttribute("readonly");
    setTime(0);
    setTimerPaused(true);
    setScoredLetters([]);
    setScoreCount(0);
    setGameStarted(false);
    setGameEnded(false);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <Preview text={text} input={input} />
        <textarea
          id="input"
          placeholder="Start typing..."
          value={input}
          onChange={inputOnChange}
        ></textarea>
        <div className="bottom">
          <Stats
            time={time}
            averageWordLength={averageWordLength}
            score={scoreCount}
            text={text}
            scoredLetters={scoredLetters}
          />
          <Button restartButton={restartButton} />
        </div>
        <div className="footer">
          © Copyright 2020 Michal Kulesza -{" "}
          <span>
            Text by <a href="https://eloquentjavascript.net/">Eloquent Javascript</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
