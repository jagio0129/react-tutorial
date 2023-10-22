import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function Game() {
  const [history, setHistory]: any = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove]: any = useState(0)
  const xIsNext: any = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((move: any) => {
    let description: string
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function Board({xIsNext, squares, onPlay}: any) {
  function handleClick(i: number) {
    if(calculateWinner(squares) || squares[i]) {
      return
    }

    const nextSquares: any = squares.slice()
    if(xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "◯"
    }
    onPlay(nextSquares)
  }

  const winner: (string | null) = calculateWinner(squares)
  let status: string
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : '◯')
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function Square({value, onSquareClick}: any): any {
  return (
    <button className='square' onClick={onSquareClick}>{value}</button>
  )
}

function calculateWinner(squares: []): (string | null) {
  const lines: number[][] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [0,4,8],
    [2,4,6]
  ]

  for (let i: number = 0; i < lines.length; i++) {
    const [a,b,c]: number[] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}
