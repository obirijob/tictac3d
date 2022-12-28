/** @format */

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

import Title from '../components/Title'

import '../styles/scene.scss'
import Grid from './Grid'
import Start from './Start'
import constants from '../helpers/constants'

function Scene({ inGame, reloadCred, gameData }) {
  const ws = new WebSocket(constants.ws)

  useEffect(() => {
    if (gameData) ws.addEventListener('open', webSocketEvent)
  }, [gameData])

  function webSocketEvent(w) {
    // w.send('how are you?')
  }

  return (
    <motion.div className="scene">
      <Title>TIC TAC TOE</Title>

      {inGame ? (
        <>
          <div>
            <div className="players">
              <span className="me">{gameData.name}</span> vs{' '}
              <span className="op">{gameData.opponent}</span> (#{gameData.game})
            </div>
          </div>
          <Grid
            columns={3}
            rows={3}
            clicked={(r, c) =>
              ws.send(
                `playermove*<>*${gameData.game}<//>${gameData.name}<//>${r}<//>${c}`
              )
            }
          />
          <div
            className="actions"
            style={{ display: 'flex', margin: '.3em', gap: '.3em' }}
          >
            <button content="Reset" />
            <button
              content="Exit"
              onClick={() => {
                localStorage.clear()
                reloadCred()
              }}
            />
          </div>
        </>
      ) : (
        <>
          <Start reloadGame={reloadCred} />
        </>
      )}

      <div className="floor"></div>
    </motion.div>
  )
}

export default Scene
