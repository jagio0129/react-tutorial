import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function Board() {
  const [xIsNext, setXIsNext]: any = useState(true)
  const [squares, setSquares]: any = useState(Array(9).fill(null))
  const winner: string | null = calculateWinner(squares)
  let status: string
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "◯")
  }

  function handleClick(i: number) {
    if(squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares: any = squares.slice()
    if(xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "◯"
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
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
