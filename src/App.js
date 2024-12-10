import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const sampleParagraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is like art. It takes creativity, patience, and passion.",
  "Typing fast and accurately is a valuable skill in today's digital world.",
  "React is a JavaScript library for building user interfaces efficiently.",
  "Learning to code can be challenging but also incredibly rewarding."
];

function App() {
  const [text, setText] = useState(getRandomParagraph());
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [charactersPerMinute, setCharactersPerMinute] = useState(0);
  const inputRef = useRef(null);

  // Get a random paragraph
  function getRandomParagraph() {
    return sampleParagraphs[Math.floor(Math.random() * sampleParagraphs.length)];
  }

  // Start the timer
  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      calculateSpeed();
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // Start the game
  const startGame = () => {
    setIsRunning(true);
    setTimer(60);
    setUserInput('');
    setMistakes(0);
    setWordsPerMinute(0);
    setCharactersPerMinute(0);
    inputRef.current.focus();
    setText(getRandomParagraph());
  };

  // Handle user input and calculate mistakes
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    const textArray = text.split('');
    const userInputArray = value.split('');

    let errors = 0;
    userInputArray.forEach((char, index) => {
      if (char !== textArray[index]) {
        errors++;
      }
    });
    setMistakes(errors);
  };

  // Calculate speed
  const calculateSpeed = () => {
    const words = userInput.trim().split(/\s+/).length;
    const characters = userInput.length;

    setWordsPerMinute(words);
    setCharactersPerMinute(characters);
  };

  return (
    <div className="App">
      <h1>Typing Speed Tester</h1>
      <p className="paragraph">{text}</p>
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        disabled={!isRunning || timer === 0}
        placeholder="Start typing here..."
      />
      <div className="info">
        <p>Time Remaining: {timer}s</p>
        <p>Mistakes: {mistakes}</p>
        <p>Words per Minute: {wordsPerMinute}</p>
        <p>Characters per Minute: {charactersPerMinute}</p>
      </div>
      <button onClick={startGame}>Start / Reset</button>
    </div>
  );
}

export default App;
