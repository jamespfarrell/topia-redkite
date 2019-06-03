import React, { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import { getAllUsers, activateUser, deactivateUser } from '../../utils/admin'
import styled from 'styled-components'
import SEO from '../SEO'

const Table = styled.table`
  width: 100%;

  tr {
    height: 35px;
  }
`

const Users = ({store}) => {
  const adminToken = store.CurrentUser.token
  const [users, setUsers] = useState([])

  const toggleActive = async (user, index) => {
    try {
      let response
      const usersCopy = [...users]
      if (user.active) {
        response = await deactivateUser(adminToken, user.id)
      } else {
        response = await activateUser(adminToken, user.id)
      }

      usersCopy[index] = response.data.user
      setUsers(usersCopy)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllUsers(adminToken)
      setUsers(data.users)
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <SEO title='All users' />
      <h1>Users</h1>
      <Table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Status</td>
            <td>Operations</td>
          </tr>
          {users.map((user, index) => <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.active ? 'Active' : 'Inactive'}</td>
            <td>
              <button onClick={() => toggleActive(user, index)}>
                {user.active ? 'Deactivate' : 'Activate'}
              </button>
            </td>
          </tr>)}
        </tbody>
      </Table>
    </React.Fragment>
  )
}

export default inject(`store`)(Users)
