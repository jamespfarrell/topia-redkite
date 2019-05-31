import React, { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import { getAllUsers, activateUser } from '../../utils/admin'
import styled from 'styled-components'

const Table = styled.table`
  width: 100%;

  tr {
    height: 35px;
  }
`

const Dashboard = ({store}) => {
  const adminToken = store.CurrentUser.token
  const [users, setUsers] = useState([])
  const [modifiedIds, setModified] = useState([])

  const activate = async (id) => {
    await activateUser(adminToken, id)
    setModified([...modifiedIds, id])
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllUsers(adminToken)
      setUsers(data.users)
    }

    fetchData()
  }, [modifiedIds])

  return (
    <React.Fragment>
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
          {users.map(user => <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.active ? 'Active' : 'Inactive'}</td>
            <td>
              {user.active ? 'Deactivate' : <button onClick={() => activate(user.id)}>Activate</button>}
            </td>
          </tr>)}
        </tbody>
      </Table>
    </React.Fragment>
  )
}

export default inject(`store`)(Dashboard)
