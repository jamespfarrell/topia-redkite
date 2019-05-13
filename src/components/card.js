import React from 'react'
import MiniBarChart from './miniBarChart'

const card = (props) => {
  const { data } = props
  const cells = data.map((cell) => {
    const { title, subtitle, chartValues } = cell

    return (
      <div className='cell'>
        <div className='card'>
          <div className='card-section'>
            <h5>{title}</h5>
            <h3>{subtitle}</h3>
            <MiniBarChart data={chartValues} />
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className='card'>
      <div className='card-section'>
        <div className='grid-container'>
          <div className='grid-x grid-padding-x small-up-2 medium-up-4 text-center'>
            {cells}
          </div>
        </div>
      </div>
    </div>
  )
}

export default card
