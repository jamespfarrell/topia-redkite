import React, { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import SEO from '../SEO'
import UserLayout from '../UserLayout'
import '@kenshooui/react-multi-select/dist/style.css'
import "react-datepicker/dist/react-datepicker.min.css"
import "./New.scss"
import ProjectForm from './ProjectForm'

const New = ({store, orgId}) => {
  
  return (
    <UserLayout>
      <SEO title='Add new project' />
      <ProjectForm></ProjectForm>
    </UserLayout>
  )
}

export default inject(`store`)(New)
