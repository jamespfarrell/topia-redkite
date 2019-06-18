import React from 'react'
import { ConfirmationBar } from '../Form'

const Confirmation = ({text, show}) => {
  if(show) {
    return <ConfirmationBar>
      <span role="img" aria-label='OK emoji'>✌️</span> {text}
    </ConfirmationBar>
  } else {
    return null
  }
}

export default Confirmation
