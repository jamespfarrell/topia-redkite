import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import AuthLayout from './AuthLayout'
import { inject } from 'mobx-react'

const Logout = ({store}) => {

  useEffect(() => {
    store.Logout()
    navigate('/app/login')
  }, [])

  return <AuthLayout>
    <h1>Please wait...</h1>
  </AuthLayout>
}



export default inject(`store`)(Logout)
