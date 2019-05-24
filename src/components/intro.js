import React from 'react'

const intro = (props) => (
  <div id='Intro' className='grid-x align-bottom'>
    <div className='cell small-12 medium-6 flex-container'>
      <div className='avatar'>C</div>
      <div className='align-self-bottom'>
        <h5 className='marginless'>Corporate Name</h5>
        <p className='marginless'>Atlanta, USA - <a href='#1'>corp.com</a></p>
        <div className='flex-container'>
          <a href='#1'><div className='circle'>2</div></a>
          <a href='#2'><div className='circle'>4</div></a>
          <a href='#3'><div className='circle'>13</div></a>
          <a href='#4'><div className='circle'>15</div></a>
          <a href='#5'><div className='circle'>17</div></a>
        </div>
      </div>
    </div>
    <div className='cell small-12 medium-4'>
      <p className='marginless'>Supported Organizations</p>
      <div className='flex-container'>
        <a href='#1'><div className='circle'>N</div></a>
        <a href='#2'><div className='circle'>N</div></a>
        <a href='#3'><div className='circle'>N</div></a>
        <a href='#4'><div className='circle'>+12</div></a>
      </div>
    </div>
    <div className='cell small-12 medium-2'>
      <a className='button' href='#pdf'>Download Report</a>
    </div>
  </div>
)

export default intro
