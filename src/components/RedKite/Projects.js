import React from 'react'
import { getAllProjects } from '../../utils/project'
import { inject } from 'mobx-react'

import Project from '../Project/SearchResult'
// import Meta from '../../components/meta'
import Layout from '../layout'


const Projects = ({ location, store, orgStub }) => {
  
  const [projects, setProjects] = React.useState([])

  React.useEffect(() => {
    const fetchOrganization = async () => {
      const projects = await getAllProjects()

      console.log(`setProjects to  --->  ${JSON.stringify(projects, null, 2)}`)

      setProjects(projects)
    }

    fetchOrganization()
  }, [])
  return (
    <Layout location={location} store={store}>
      {/* <Meta site={get(data, 'site.meta')} /> */}
      <div className="container-fluid" style={{ padding: '0 200px' }}>
        <div
          className="row pt-5 ml-5 mr-5"
          style={{ textAlign: 'center', border: '1px solid blue' }}
        >
          <div className="col-sm p-5" style={{ backgroundColor: 'white' }}>
            23
            <br />
            active projects
          </div>
          <div className="col-sm p-5" style={{ backgroundColor: 'white' }}>
            1.7 / 4M$
            <br />
            active yearly budget
          </div>
          <div className="col-sm p-5" style={{ backgroundColor: 'white' }}>
            5.3 / 42M$
            <br />
            total budget in use
          </div>
          <div className="col-sm p-5" style={{ backgroundColor: 'white' }}>
            320.000
            <br />
            people reached
          </div>
        </div>
        {projects.map((project, i) => {
          console.log(`project : ${JSON.stringify(project, null, 2)}`)
          console.log(`i : ${JSON.stringify(i, null, 2)}`)
          console.log(`projects : ${JSON.stringify(projects, null, 2)}`)

          return (
            <Project
              project={project}
              options={{
                isIndex: true,
              }}
              key={i}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default inject(`store`)(Projects)

