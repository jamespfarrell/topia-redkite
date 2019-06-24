import React from 'react'
import Layout from './Layout'
import styled from 'styled-components'
import { Link } from 'gatsby'
import SEO from '../SEO'
import { getOrganization } from '../../utils/organization'
import 'react-vis/dist/style.css'
import { XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis'

const co2data = [
  {x: '2009', y: 2275},
  {x: '2010', y: 2650},
  {x: '2011', y: 3150},
  {x: '2012', y: 3856.25},
  {x: '2013', y: 4356.25},
  {x: '2014', y: 4856.25},
  {x: '2015', y: 5356.25},
  {x: '2016', y: 5356.25},
  {x: '2017', y: 5356.25},
  {x: '2018', y: 5412.5}
]

const treesdata = [
  {x: '2009', y: 455000},
  {x: '2010', y: 530000},
  {x: '2011', y: 630000},
  {x: '2012', y: 771250},
  {x: '2013', y: 871250},
  {x: '2014', y: 971250},
  {x: '2015', y: 1071250},
  {x: '2016', y: 1071250},
  {x: '2017', y: 1071250},
  {x: '2018', y: 1082500}
]

const jobsData = [
  {x: '2009', y: 1251},
  {x: '2010', y: 1278.8},
  {x: '2011', y: 1306.6},
  {x: '2012', y: 1387.2},
  {x: '2013', y: 1416.1},
  {x: '2014', y: 1445},
  {x: '2015', y: 1473.9},
  {x: '2016', y: 1560.6},
  {x: '2017', y: 1676.2},
  {x: '2018', y: 1687.8}
]

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

const ImpactCard = styled.div`
  width: 100%;

  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 2px 14px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  margin-bottom: 16px;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }

  @media only screen and (min-width: 768px) {
    height: 370px;
  }

  .graph {
    background: #FAFAFB;
    width: 60%;
    padding: 6px;

    svg {
      overflow: visible;
    }

    .rv-xy-plot {
      right: -30px;
    }

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

  const [ org, setOrg ] = React.useState({url: '', transactions: []})

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
          <h2>5412.5</h2>
          <p>
          The activities of Masarang may take place in Indonesia but they play a global role.
          After all, the problems in Indonesia have an impact on the entire planet.
          </p>
          <div className='projects'>
          </div>
        </div>

        <div className='graph'>
          <XYPlot height={320} width={360} xType="ordinal">
            <LineSeries data={co2data} />
            <XAxis title="Year" />
            <YAxis title="CO2 absorption in tons" />
            <HorizontalGridLines />
          </XYPlot>
        </div>
      </ImpactCard>

      <ImpactCard>
        <div className='info'>
          <h1>Trees planted</h1>
          <h2>1082500</h2>
          <p>
          The activities of Masarang may take place in Indonesia but they play a global role.
          After all, the problems in Indonesia have an impact on the entire planet.
          </p>
          <div className='projects'>
          </div>
        </div>

        <div className='graph'>
          <XYPlot height={340} width={360} xType="ordinal">
            <LineSeries data={treesdata} />
            <XAxis title="Year" />
            <YAxis title="Number of trees planted" />
            <HorizontalGridLines />
          </XYPlot>
        </div>
      </ImpactCard>

      <ImpactCard>
        <div className='info'>
          <h1>Jobs created</h1>
          <h2>1687</h2>
          <p>
          The activities of Masarang may take place in Indonesia but they play a global role.
          After all, the problems in Indonesia have an impact on the entire planet.
          </p>
          <div className='projects'>
          </div>
        </div>

        <div className='graph'>
          <XYPlot height={320} width={360} xType="ordinal">
            <LineSeries data={jobsData} />
            <XAxis title="Year" />
            <YAxis title="Number of jobs created" />
            <HorizontalGridLines />
          </XYPlot>
        </div>
      </ImpactCard>
  </Layout>
}

export default Page
