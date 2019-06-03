import React, { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import { getAllEmails } from '../../utils/admin'
import styled from 'styled-components'
import SEO from '../SEO'

const Table = styled.table`
  width: 100%;

  tr {
    height: 35px;
  }
`

const NewsletterEmails = ({store}) => {
  const adminToken = store.CurrentUser.token
  const [emails, setEmails] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data }  = await getAllEmails(adminToken)
      setEmails(data)
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <SEO title='Emails' />
      <h1>Newsletter Emails</h1>
      <Table>
        <tbody>
          <tr>
            <td>Email</td>
          </tr>
          {emails.map(email => <tr key={email.id}>
            <td>{email.email}</td>
          </tr>)}
        </tbody>
      </Table>
    </React.Fragment>
  )
}

export default inject(`store`)(NewsletterEmails)
