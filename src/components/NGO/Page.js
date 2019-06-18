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

const ImpactCard = styled.div`
  width: 100%;

  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 2px 14px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }

  @media only screen and (min-width: 768px) {
    height: 370px;
  }

  .graph {
    background: #FAFAFB;
    width: 60%;
    padding: 48px;

    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .info {
    padding: 48px;
    width: 40%;

    @media only screen and (max-width: 768px) {
      width: 100%;
    }

    .projects {
      margin-top: 48px;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.57;
      color: #b8bcc3;
    }

    h1 {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      color: #9598a6;
    }

    h2 {
      font-size: 40px;
      font-weight: 600;
      line-height: 1.4;
      color: #383a44;
    }

    p {
      font-size: 14px;
      line-height: 1.57;
      color: #383a44;
    }
  }
`

const Page = (props) => {

  const [ org, setOrg ] = React.useState({})

  React.useEffect(() => {
    const fetchOrganization = async () => {
      const response = await getOrganization(props.id)
      setOrg(response)
    }

    fetchOrganization()
  }, [])


  return <Layout organization={org}>
    <SEO title='Impact' />
    <SubMenu>
      <ul>
        <li className='active'><Link to={`/app/ngo/${props.id}`}>Impact</Link></li>
        <li><Link to={`/app/ngo/${props.id}/projects`}>Projects</Link></li>
        <li><Link to={`/app/ngo/${props.id}/donors`}>Donors</Link></li>
        <li><Link to={`/app/ngo/${props.id}/about`}>About</Link></li>
      </ul>
    </SubMenu>

      <ImpactCard>
        <div className='info'>
          <h1>CO₂ reductions in metric tons</h1>
          <h2>472</h2>
          <p>
          The activities of Masarang may take place in Indonesia but they play a global role.
          After all, the problems in Indonesia have an impact on the entire planet.
          </p>
          <div className='projects'>
            <p>Projects</p>
          </div>
        </div>

        <div className='graph'>
          Graph here
        </div>
      </ImpactCard>
  </Layout>
}

export default Page
