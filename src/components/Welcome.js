import React from 'react'
import AuthLayout from './AuthLayout'
import { inject } from 'mobx-react'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'

const Home = ({store}) => {
  const { name } = store.CurrentUser.user

  const logout = () => {
    store.Logout()
    navigate('/app/login')
  }

  return (
    <AuthLayout>
      <p>Welcome, {name}!</p>
      {store.isAdmin && <p>Go to <Link to='/admin'>admin panel</Link></p>}
      <p>
        <button onClick={logout}>
          Logout
        </button>
      </p>
    </AuthLayout>
  )
}

export default inject(`store`)(Home)
