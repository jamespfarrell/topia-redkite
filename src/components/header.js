import React from 'react'
import { Link } from 'gatsby'

const header = (props) => {
  const { headerText } = props
  return (
    <div>
      <ul className='menu'>
        <h3>{headerText}</h3>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about-us/'>About Us</Link>
        </li>
        <li>
          <Link to='/corporative/'>Corporative</Link>
        </li>
      </ul>
    </div>
  )
}

export default header
