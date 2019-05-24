import React from 'react'

const miniBarChart = (props) => {
  const { data } = props
  if (!data) return null
  const bars = data.map((bar) => {
    const style = {
      height: bar
    }
    return (
      <div style={style} className='MiniBarChart--bar' />
    )
  })

  return (
    <div className='MiniBarChart flex-container align-center-middle'>
      {bars}
    </div>
  )
}
export default miniBarChart
