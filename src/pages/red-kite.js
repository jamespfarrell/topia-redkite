import { graphql } from 'gatsby'
import React from 'react'
import get from 'lodash/get'
import { getAllProjects } from '../utils/project'

import Project from '../templates/project'
import Meta from '../components/meta'
import Layout from '../components/layout'
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const BlogIndex = ({ data, location }) => {
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }
  
  const posts = get(data, 'remark.posts')
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
    <Layout location={location}>
      <button onClick={openModal}>Create project</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      <Meta site={get(data, 'site.meta')} />
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

export default BlogIndex

// export const pageQuery = graphql`
//   query IndexQuery {
//     site {
//       meta: siteMetadata {
//         title
//         description
//         url: siteUrl
//         author
//         twitter
//         adsense
//       }
//     }
//     remark: allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC }
//     ) {
//       posts: edges {
//         post: node {
//           html
//           frontmatter {
//             layout
//             title
//             path
//             category
//             tags
//             description
//             date(formatString: "YYYY/MM/DD")
//             image {
//               childImageSharp {
//                 fluid(maxWidth: 500) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
