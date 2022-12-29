/** @format */

import React, { useState, useEffect } from 'react'

import '../styles/grid.scss'
import Cell from './Cell'

function Grid({ columns, rows, clicked, gridMatrix, me }) {
  const [matrix, setMatrix] = useState([[]])

  useEffect(() => {
    const myMat = []
    for (let r = 0; r < rows; r++) {
      const row = []
      for (let c = 0; c < columns; c++) {
        row.push(0)
      }
      myMat.push(row)
    }
    setMatrix(m => (m = myMat))
  }, [columns, rows])

  return (
    <div className="grid">
      {matrix.map((r, ir) => (
        <div className="rows" key={`row${ir}`}>
          {r.map((c, ic) => {
            const cg = gridMatrix.find(g => {
              return (
                // eslint-disable-next-line
                Object.values(g)[0][0] == ir && Object.values(g)[0][1] == ic
              )
            })
            const currentPlayer = cg ? Object.keys(cg)[0] : ''
            return (
              <Cell
                me={me}
                player={currentPlayer}
                key={`col${ic}`}
                clicked={() => {
                  console.log(ir, ic)
                  clicked(ir, ic)
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Grid
