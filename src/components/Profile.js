import React, { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import Basic from './Profile/Basic'
import Account from './Profile/Account'
import Organization from './Profile/Organization'
import SEO from './SEO'
import { getOrganizations } from '../utils/user'
import UserLayout from './UserLayout'

const Profile = ({store}) => {
  const { token } = store.CurrentUser
  const [organizations, setOrganizations ]= useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrganizations({ token })
      setOrganizations(response.data)
    }

    fetchData()
  }, [])

  return (
    <UserLayout>
      <SEO title='Profile settings' />
      <a id="#profile"></a>
      <Basic />
      {organizations.map(org => <Organization
        key={org.id}
        id={org.id}
        name={org.name}
        logoUrl={org.logoUrl}
        bannerUrl={org.bannerUrl}
      />)}
      <a id="#organization"></a>
      <Account />
    </UserLayout>
  )
}

export default inject(`store`)(Profile)
