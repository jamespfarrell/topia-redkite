import React from 'react'
import Layout from './Layout'
import styled from 'styled-components'
import { Link } from 'gatsby'
import SEO from '../SEO'
import { getOrganization } from '../../utils/organization'

const AboutCard = styled.div`
  width: 100%;
  padding: 48px;

  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 2px 14px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  margin-bottom: 16px;

  p {
    font-size: 14px;
    line-height: 1.57;
    color: #383a44;
  }
}
`

const SubMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 36px;

  ul {
    list-display-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

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
  const [ org, setOrg ] = React.useState({url: '', name: '', transactions: [], projects: []})

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

  <AboutCard>
    <p>
      “Nature conservation through collaboration with and development of the local population.”
      That is the mission of Masarang, our foundation in Indonesia, founded in 2001 by Dr. Eng. Willie Smits.
    </p>

    <p>
      Masarang finds solutions for the most urgent global problems of our time:
      deforestation, biodiversity loss, climate change, poverty and underdevelopment.
    </p>

    <p>
    The activities of Masarang may take place in Indonesia but they play a global role.
    After all, the problems in Indonesia have an impact on the entire planet.
    Ongoing deforestation is leading to massive carbon dioxide emissions with
    great consequences for climate change and the environment. Masarang is
    tackling these issues at their heart and works to find sustainable solutions which will work long-term.
    </p>

    <p>
      <i>
        Much is known about the products of the tropical rainforest, there is still much more to discover!
      </i>
    </p>
  </AboutCard>
</Layout>

}

export default Page
