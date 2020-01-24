import React from 'react'
import Layout from './Layout'
import styled from 'styled-components'
import { Link } from 'gatsby'
import SEO from '../SEO'
import { getOrganization } from '../../utils/organization'
import { projectBannerApiUrl } from '../../utils/routing'

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

const ProjectList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`

const ProjectCard = styled.div`
  width: 460px;
  height: 576px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 2px 14px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  margin-bottom: 24px;
`

const Img = styled.div `
  width: 100%;
  height: 200px;
  background: gray;
  background-size: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

const Content = styled.div `
  padding: 48px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.33;
    color: #383a44;
    padding: 0;
    margin: 0;
  }

  a {
    color: #383a44;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }

  p {
    font-size: 14px;
    line-height: 1.57;
    color: #7e808c;
  }

  .text {
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    height: 86px;
    overflow: hidden;
  }

  .sdgs {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.57;
    color: #4a4c54;
    margin-top: 48px;
  }
`

const SdgBubble = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: solid 2px ${props => props.color};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
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
    <SEO title='Projects' />
    <SubMenu>
      <ul>
        <li><Link to={`/app/ngo/${props.id}`}>Impact</Link></li>
        <li className='active'><Link to={`/app/ngo/${props.id}/projects`}>Projects</Link></li>
        <li><Link to={`/app/ngo/${props.id}/donors`}>Donors</Link></li>
        <li><Link to={`/app/ngo/${props.id}/about`}>About</Link></li>
      </ul>
    </SubMenu>
    <ProjectList>
      {(org.projects ? org.projects.map(project =>
        <ProjectCard key={project.id}>
          <Img style={{backgroundImage: `url(${projectBannerApiUrl(project.bannerFilename)})`}}/>
          <Content>
            <h2>{project.name}</h2>
            <p className='text'>{project.description}</p>
            {project.sattelite_url && <p className='sattelite'>
              <a href={project.sattelite_url}>
                Sattelite photos
              </a>
            </p>}
            <div className='sdgs'>
              <p>Supported SDGs</p>
              <SdgBubble color="#00a721">2</SdgBubble>
              <SdgBubble color="#f5b222">4</SdgBubble>
              <SdgBubble color="#00bbee">13</SdgBubble>
            </div>
          </Content>
        </ProjectCard>
      ): null)}
    </ProjectList>
  </Layout>
}

export default Page
