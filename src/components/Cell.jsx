/** @format */

import React from 'react'

import '../styles/cell.scss'

function Cell({ clicked, player, me }) {
  return (
    <div
      // eslint-disable-next-line
      className={`cell ${player && 'selected'} ${me == player && 'mine'}`}
      onClick={() => clicked()}
    >
      <div className="top"></div>
      <div className="bottom"></div>

      <div className="front">{player}</div>
      <div className="back"></div>

      <div className="left"></div>
      <div className="right"></div>
    </div>
  )
}

export default Cell
