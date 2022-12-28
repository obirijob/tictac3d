/** @format */

import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import postRequest from '../helpers/postRequest'

import '../styles/start.scss'
import Modal from './Modal'
import Title from './Title'

function Start({ reloadGame }) {
  const [newGame, setNewGame] = useState(false)
  const [joinGame, setJoinGame] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [newWait, setNewWait] = useState(false)
  const [joinWait, setJoinWait] = useState(false)
  const [jName, setJName] = useState('')
  const [jGame, setJGame] = useState('')
  const [jPassword, setJPassword] = useState('')

  return (
    <div className="start">
      <button
        onClick={() => {
          setJoinGame(n => (n = false))
          setNewGame(n => (n = true))
        }}
        content="New Game"
      ></button>
      <button
        onClick={() => {
          setNewGame(n => (n = false))
          setJoinGame(n => (n = true))
        }}
        content="Join"
      ></button>
      <AnimatePresence mode="wait">
        {newGame && (
          <Modal>
            {newWait ? (
              <div style={{ padding: '.5em' }}>
                <Title>Please Wait...</Title>
              </div>
            ) : (
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  setNewWait(w => (w = true))
                  try {
                    const data = await postRequest('game/new', {
                      name,
                      password,
                    })
                    localStorage.setItem('game', data.id + '_1_' + password)
                    reloadGame()
                  } catch (er) {
                    alert(er)
                  }
                  setNewWait(w => (w = false))
                }}
              >
                <Title>Create Game</Title>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.3em',
                    padding: '.2em',
                  }}
                >
                  <input
                    onInput={e => setName(e.target.value)}
                    type="text"
                    placeholder="Player Name "
                    required
                  />
                  <input
                    onInput={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Game Password"
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '.5em', padding: '.5em' }}>
                  <button content="Create" />
                  <button
                    content="Cancel"
                    onClick={e => {
                      e.preventDefault()
                      setNewGame(false)
                    }}
                  />
                </div>
              </form>
            )}
          </Modal>
        )}
        {joinGame && (
          <Modal close={() => setJoinGame(false)}>
            {joinWait ? (
              <div style={{ padding: '.5em' }}>
                <Title>Please Wait...</Title>
              </div>
            ) : (
              <form
                style={{ padding: '.5em' }}
                onSubmit={async e => {
                  e.preventDefault()
                  setJoinWait(j => (j = true))
                  try {
                    const data = await postRequest('game/join', {
                      name: jName,
                      id: jGame,
                      password: jPassword,
                    })
                    localStorage.setItem('game', data.id + '_' + jPassword)
                    reloadGame()
                  } catch (er) {
                    alert(er)
                  }
                  setJoinWait(w => (w = false))
                }}
              >
                <Title>Join game</Title>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.2em',
                    padding: '.5em',
                  }}
                >
                  <input
                    onInput={e => setJName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    required
                    onClick={e => reloadGame()}
                  />
                  <input
                    onInput={e => setJGame(e.target.value)}
                    type="text"
                    placeholder="Game Id"
                    required
                  />
                  <input
                    onInput={e => setJPassword(e.target.value)}
                    type="text"
                    placeholder="Password"
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '.5em', padding: '.5em' }}>
                  <button content="Join" />
                  <button
                    content="Cancel"
                    onClick={e => {
                      e.preventDefault()
                      setJoinGame(false)
                    }}
                  />
                </div>
              </form>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Start
