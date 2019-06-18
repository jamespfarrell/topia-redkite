import React from 'react'
import Layout from './Layout'
import styled from 'styled-components'
import { Link } from 'gatsby'
import SEO from '../SEO'
import { getOrganization } from '../../utils/organization'

const SubMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 36px;

  ul {
    list-display-style: none;

    li {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.57;
      color: #b8bcc3;
      display: inline;
      margin: 17px;
      padding: 9px;
      border-radius: 4px;

      a {
        color: #B8BCC3;
        text-decoration: none
      }

      a:hover {
        color: #383a44;
      }

      &.active {
        background-color: #E7E9EB;

        a {
          color: #383a44;
          font-weight: 600;
        }
      }
    }
  }
`

const Page = (props) => {
  const [ org, setOrg ] = React.useState({name: '', projects: []})

  React.useEffect(() => {
    const fetchOrganization = async () => {
      const response = await getOrganization(props.id)
      setOrg(response)
    }

    fetchOrganization()
  }, [])

  return <Layout organization={org}>
  <SEO title='All projects' />
  <SubMenu>
    <ul>
      <li><Link to={`/app/ngo/${props.id}`}>Impact</Link></li>
      <li><Link to={`/app/ngo/${props.id}/projects`}>Projects</Link></li>
      <li><Link to={`/app/ngo/${props.id}/donors`}>Donors</Link></li>
      <li className='active'><Link to={`/app/ngo/${props.id}/about`}>About</Link></li>
    </ul>
  </SubMenu>

  About
</Layout>

}

export default Page
