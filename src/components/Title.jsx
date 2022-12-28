/** @format */

import React from 'react'
import { motion } from 'framer-motion'

import '../styles/title.scss'

function Title({ children }) {
  const letters = children.split('')
  return (
    <div className="title">
      {letters.map((l, i) => (
        <motion.span className="letter">{l}</motion.span>
      ))}
    </div>
  )
}

export default Title
