import React from 'react'
import { inject } from 'mobx-react'

const Dashboard = ({store}) => {
  const { user } = store.CurrentUser

  return (
    <React.Fragment>
      {user && <p>Welcome, {user.name}!</p>}
    </React.Fragment>
  )
}

export default inject(`store`)(Dashboard)
