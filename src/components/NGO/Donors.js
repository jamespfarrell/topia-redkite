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

const DonorList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`

const Img = styled.div `
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: #000000;
  margin-bottom: 16px;
`

const DonorCard = styled.div`
  width: 204px;
  height: 252px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 2px 14px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  padding: 32px 48px;
  margin-bottom: 16px;

  h2 {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.57;
    color: #383a44;
    padding: 0;
    margin: 0;
  }

  h3 {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.57;
    color: #b8bcc3;
  }

  b {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.25;
    color: #383a44;
    display: block;
    margin-top: 40px;
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
  <SEO title='Donors' />
  <SubMenu>
    <ul>
      <li><Link to={`/app/ngo/${props.id}`}>Impact</Link></li>
      <li><Link to={`/app/ngo/${props.id}/projects`}>Projects</Link></li>
      <li className='active'><Link to={`/app/ngo/${props.id}/donors`}>Donors</Link></li>
      <li><Link to={`/app/ngo/${props.id}/about`}>About</Link></li>
    </ul>
  </SubMenu>
  <DonorList>
    <DonorCard>
      <Img />
      <h2>Deloitte</h2>
      <h3>Management Consulting</h3>
      <b>$555.000</b>
    </DonorCard>

    <DonorCard>
      <Img />
      <h2>Deloitte</h2>
      <h3>Management Consulting</h3>
      <b>$555.000</b>
    </DonorCard>

    <DonorCard>
      <Img />
      <h2>Deloitte</h2>
      <h3>Management Consulting</h3>
      <b>$555.000</b>
    </DonorCard>

    <DonorCard>
      <Img />
      <h2>Deloitte</h2>
      <h3>Management Consulting</h3>
      <b>$555.000</b>
    </DonorCard>
  </DonorList>
</Layout>

}

export default Page
