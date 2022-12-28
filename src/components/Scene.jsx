/** @format */

import React from 'react'
import { motion } from 'framer-motion'

import Title from '../components/Title'

import '../styles/scene.scss'
import Grid from './Grid'
import Start from './Start'

function Scene({ inGame }) {
  return (
    <motion.div className="scene">
      <Title>TIC TAC TOE</Title>
      {inGame ? (
        <>
          <Grid columns={3} rows={3} />
        </>
      ) : (
        <>
          <Start />
        </>
      )}
      <div className="floor"></div>
    </motion.div>
  )
}

export default Scene
