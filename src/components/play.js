import React, { useState } from "react";

function Play() {
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [message, setMessage] = useState("Start the game!");
  const [bgColor, setBgColor] = useState("#1e293b"); // slate-800 for dark vibes
  const [mode, setMode] = useState("light");

  const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
  };

  const drawGame = () => {
    setMessage("It's a draw! Try again.");
    setBgColor("#64748b"); // blue-gray
  };

  const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
      setUserScore((prev) => prev + 1);
      setMessage(`You win! ${userChoice} beats ${compChoice}`);
      setBgColor("#22c55e"); // green-500
    } else {
      setCompScore((prev) => prev + 1);
      setMessage(`You lost! ${compChoice} beats ${userChoice}`);
      setBgColor("#ef4444"); // red-500
    }
  };

  const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
      drawGame();
    } else {
      let userWin = true;
      if (userChoice === "rock") {
        userWin = compChoice === "paper" ? false : true;
      } else if (userChoice === "paper") {
        userWin = compChoice === "scissors" ? false : true;
      } else {
        userWin = compChoice === "rock" ? false : true;
      }
      showWinner(userWin, userChoice, compChoice);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const containerStyle = {
    background: mode === "light" ? "linear-gradient(to right, #f8fafc, #e2e8f0)" : "linear-gradient(to right, #0f172a, #1e293b)",
    color: mode === "light" ? "#1e293b" : "#f8fafc",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.5s ease-in-out",
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
  };

  const buttonStyle = {
    margin: "10px",
    padding: "14px 28px",
    fontSize: "18px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0px 8px 15px rgba(59, 130, 246, 0.4)",
    transition: "all 0.3s ease",
  };

  const buttonHover = {
    backgroundColor: "#2563eb",
    boxShadow: "0px 8px 15px rgba(37, 99, 235, 0.5)",
    transform: "translateY(-3px)",
  };

  const scoreBoardStyle = {
    marginTop: "20px",
    fontSize: "22px",
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  };

  const messageStyle = {
    backgroundColor: bgColor,
    padding: "16px 32px",
    marginTop: "30px",
    color: "white",
    fontSize: "20px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
    transition: "background-color 0.5s ease",
  };

  const modeButtonStyle = {
    marginTop: "40px",
    padding: "10px 20px",
    fontSize: "18px",
    borderRadius: "10px",
    backgroundColor: mode === "light" ? "#0f172a" : "#e2e8f0",
    color: mode === "light" ? "#e2e8f0" : "#0f172a",
    border: "2px solid currentColor",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Rock Paper Scissors</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {["rock", "paper", "scissors"].map((choice) => (
          <button
            key={choice}
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            onClick={() => playGame(choice)}
          >
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>

      <div style={scoreBoardStyle}>
        <p>User: <span>{userScore}</span></p>
        <p>Computer: <span>{compScore}</span></p>
      </div>

      <div style={messageStyle}>
        {message}
      </div>

      <button style={modeButtonStyle} onClick={toggleMode}>
        Switch to {mode === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}

export default Play;
