/** @format */

import React from 'react'

import '../styles/cell.scss'

function Cell({ clicked }) {
  return (
    <div className="cell" onClick={() => clicked('Heeeeey!')}>
      <div className="top"></div>
      <div className="bottom"></div>

      <div className="front"></div>
      <div className="back"></div>

      <div className="left"></div>
      <div className="right"></div>
    </div>
  )
}

export default Cell
