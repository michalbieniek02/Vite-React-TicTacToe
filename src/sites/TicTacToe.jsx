import React, { useState } from 'react';
import Board from '../components/Board.jsx';
import '../styles/TicTacToe.scss'

const TicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [scores, setScores] = useState({ X: 0, O: 0 });
  
    const handlePlayerChange = (event) => {
      event=='X'? setXIsNext(true) : setXIsNext(false)
    };
  
    const handleClick = (index) => {
      if (calculateWinner(squares) || squares[index]) {
        return;
      }
      
      const newSquares = squares.slice();
      newSquares[index] = xIsNext ? 'X' : 'O';
      setSquares(newSquares);
      setXIsNext(!xIsNext);
      
      const nullCount = squares.filter(item => item === null).length;

      if (nullCount === 1) {
          handleReset();
      }
    };
  
    const handleReset = () => {
      setSquares(Array(9).fill(null));
    };
  
    const winner = calculateWinner(squares);
  
    if (winner) {
      setTimeout(() => {
        setScores(prevScores => ({
          ...prevScores,
          [winner]: prevScores[winner] + 0.5
        }));
        handleReset();
      }, 4000); 
    }
  
    const status = winner ? `Congrats ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
    const turnClass = xIsNext ? 'x-turn' : 'o-turn';
  
    return (
      <div className={`game ${winner ? 'rainbow-background' : ''}`}>
          <div className='scoreboard'>
            <div>X: {scores.X}</div>
            <div>O: {scores.O}</div>
          </div>
          <div>
            <label>
              Starting Player:
              <select onChange={handlePlayerChange}>
                <option value="X">X</option>
                <option value="O">O</option>
              </select>
            </label>
          </div>
        <div className="game-board">
          <Board squares={squares} onClick={handleClick} turn={turnClass} />
        </div>
        <div className="game-info">
          <div className={winner? 'bigger-text' : ''}>{status}</div>
        </div>
      </div>
    );
  };
   
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

export default TicTacToe