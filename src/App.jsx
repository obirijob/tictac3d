/** @format */
import { useState, useEffect } from 'react'
import './App.scss'
import Scene from './components/Scene'
import getRequest from './helpers/getRequest'

function App() {
  const [tr, setTr] = useState(false)
  const [inGame, setInGame] = useState(false)
  const [gameData, setGameData] = useState(null)

  useEffect(() => {
    loadGame()
  }, [tr])

  async function loadGame() {
    try {
      const dt = await getRequest(
        `game/current/${localStorage.getItem('game')}`
      )
      setInGame(true)
      setGameData(dt)
    } catch (err) {
      setInGame(false)
    }
  }
  return (
    <div className="game">
      <Scene
        reloadCred={() => setTr(!tr)}
        inGame={inGame}
        gameData={gameData}
      />
    </div>
  )
}

export default App
