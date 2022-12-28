/** @format */
import { useState } from 'react'
import './App.scss'
import Scene from './components/Scene'

function App() {
  const [inGame, setInGame] = useState(false)
  return (
    <div className="game">
      <Scene inGame={inGame} />
    </div>
  )
}

export default App
