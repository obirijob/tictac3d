/** @format */

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import Title from '../components/Title'

import '../styles/scene.scss'
import Grid from './Grid'
import Start from './Start'
import constants from '../helpers/constants'
import postRequest from '../helpers/postRequest'

function Scene({ inGame, reloadCred, gameData }) {
  const [gridMatrix, setGridMatrix] = useState([])
  const [trigger, setTrigger] = useState(0)

  const ws = new WebSocket(constants.ws)

  useEffect(() => {
    ws.addEventListener('open', openSock)
    ws.addEventListener('message', messageEvent)

    return () => {
      ws.removeEventListener('open', openSock)
      ws.removeEventListener('message', messageEvent)
    }
    // eslint-disable-next-line
  }, [trigger])

  useEffect(() => {
    let t = setInterval(() => {
      console.log('running')
      setTrigger(x => (x < 1 ? (x += 1) : clearInterval(t)))
    }, 200)
    return () => {
      clearInterval(t)
    }
  }, [])

  function messageEvent({ data }) {
    setGridMatrix(JSON.parse(data))
  }

  function openSock() {
    // alert(gameData.name)
    if (gameData) {
      ws.send(
        `registerSocket*<>*${gameData.name}<//>${gameData.game}<//>${gameData.opponent}`
      )
    }
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
            gridMatrix={gridMatrix}
            me={gameData.name}
            columns={3}
            rows={3}
            clicked={async (r, c) => {
              try {
                await postRequest(`play/move`, {
                  gameId: gameData.game,
                  player: gameData.name,
                  row: r,
                  column: c,
                })
                ws.send(
                  `loadGrid*<>*${gameData.game}<//>${gameData.name}<//>${gameData.opponent}`
                )
              } catch (error) {
                alert(error.message)
              }
              // ws.send(
              //   `playermove*<>*${gameData.game}<//>${gameData.name}<//>${r}<//>${c}`
              // )
            }}
          />
          <div
            className="actions"
            style={{ display: 'flex', margin: '.3em', gap: '.3em' }}
          >
            <button
              content="Reset"
              onClick={async () => {
                await postRequest('play/reset', { gameId: gameData.game })
                ws.send(
                  `loadGrid*<>*${gameData.game}<//>${gameData.name}<//>${gameData.opponent}`
                )
              }}
            />
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
