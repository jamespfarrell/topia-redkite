import { Link } from 'gatsby'
// import Img from 'gatsby-image'
import React from 'react'

// import get from 'lodash/get'
import map from 'lodash/map'

import './style.scss'

const Project = ({ project, options, key }) => {
  
  const { name, description } = project

  return (
    <div className="row">
      <div className="col-sm article" key={key}>
        <div className="info">
          <Link style={{ boxShadow: 'none' }} to={'linkurl'}>
            <h1>{name}</h1>
            {/* <time dateTime={date}>{date}</time> */}
          </Link>
          {/* {Badges({ items: [category], primary: true })}
          {Badges({ items: tags })} */}
        </div>
        <div className="content">
          <p>{description}</p>
          {/* {fluid ? (
            <Img fluid={fluid} style={{ display: 'block', margin: '0 auto' }} />
          ) : (
            ''
          )} */}
        </div>
        {/* <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: isMore ? getDescription(html) : html,
          }}
        /> */}
      </div>
    </div>
  )
}

export default Project

const Button = ({ path, label, primary }) => (
  <Link className="readmore" to={path}>
    <span
      className={`btn btn-outline-primary btn-block ${
        primary ? 'btn-outline-primary' : 'btn-outline-secondary'
      }`}
    >
      {label}
    </span>
  </Link>
)

const Badges = ({ items, primary }) =>
  map(items, (item, i) => {
    return (
      <span
        className={`badge ${primary ? 'badge-primary' : 'badge-secondary'}`}
        key={i}
      >
        {item}
      </span>
    )
  })
