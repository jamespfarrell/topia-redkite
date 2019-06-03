import React, { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import { getAllOrganizations } from '../../utils/admin'
import styled from 'styled-components'
import SEO from '../SEO'

const Table = styled.table`
  width: 100%;

  tr {
    height: 35px;
  }
`

const Organizations = ({store}) => {
  const adminToken = store.CurrentUser.token
  const [organizations, setOrganizations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data }  = await getAllOrganizations(adminToken)
      setOrganizations(data)
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <SEO title='Organizations' />
      <h1>Organizations</h1>
      <Table>
        <tbody>
          <tr>
            <td>Name</td>
          </tr>
          {organizations.map(org => <tr key={org.id}>
            <td>{org.name}</td>
          </tr>)}
        </tbody>
      </Table>
    </React.Fragment>
  )
}

export default inject(`store`)(Organizations)
