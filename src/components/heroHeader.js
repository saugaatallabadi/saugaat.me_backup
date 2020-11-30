import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            home {
              title
              description
            }
          }
        }
      }
    `}
    render={data => (
      <div className="hero-header">
        <div className="headline">{data.site.siteMetadata.home.title}</div>
        <div 
          className="primary-content" 
          dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.home.description}}
        />
        <Link to='https://www.linkedin.com/in/saugaatallabadi/' className="button -primary">LinkedIn &rarr;</Link>
        <Link to='https://github.com/saugaatallabadi/' className="button -primary">GitHub &rarr;</Link>
        <Link to='/contact' className="button -secondary">Get in touch &rarr;</Link>
      </div>
    )}
  />
)