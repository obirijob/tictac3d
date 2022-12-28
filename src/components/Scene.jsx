/** @format */

import React from 'react'
import { motion } from 'framer-motion'

import Title from '../components/Title'

import '../styles/scene.scss'
import Grid from './Grid'

function Scene() {
  return (
    <motion.div className="scene">
      <Title>TIC TAC TOE</Title>
      <Grid columns={3} rows={3} />
      <div className="floor"></div>
    </motion.div>
  )
}

export default Scene
