import React, { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import SEO from '../SEO'
import UserLayout from '../UserLayout'
import { userProjects } from '../../utils/routing'
import axios from 'axios'
import { Link } from 'gatsby'

const All = ({store}) => {
  const { token } = store.CurrentUser
  const axiosConfig = {
    headers: {
      'Authorization': token
    }
  }
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get(userProjects, axiosConfig)
      console.log(response)
      setProjects(response.data)
    }
    fetchProjects()
  }, [])

  return (
    <UserLayout>
      <SEO title='All projects' />
      {projects.map(proj => <p key={proj.id}><Link to={`/app/projects/${proj.id}/edit`}>{proj.name}</Link></p>)}
    </UserLayout>
  )
}

export default inject(`store`)(All)
