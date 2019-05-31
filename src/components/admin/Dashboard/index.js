import React from 'react'
import { inject } from 'mobx-react'

const Dashboard = ({store}) => {
  const { name } = store.CurrentUser.user

  return (
    <React.Fragment>
      <p>Welcome, {name}!</p>
    </React.Fragment>
  )
}

export default inject(`store`)(Dashboard)
