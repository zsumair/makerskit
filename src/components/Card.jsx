import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby-plugin-modal-routing"
import PropTypes from "prop-types"
import React from "react"
import { Feature } from "."

export const Card = props => {
  const {
    category,
    image: {
      localFiles: [cover],
    },
    name,
    navigation,
    slug,
    summary,
    tags,
  } = props

  return (
    <div className="bg-white h-full shadow-sm rounded-md overflow-hidden hover:bg-blue-100 text-center">
      <Link to={`/${slug}`} state={{ navigation }} asModal>
        <div className="bg-blue-300">
          <Img fluid={cover.childImageSharp.fluid} alt={name} />
        </div>
        <div className="p-5 pb-1">
          <h1 className="text-2xl text-blue-500 font-bold leading-snug">
            {name}
          </h1>
          <p className="text-base text-blue-900 mb-5 font-medium">{summary}</p>
          <div
            className="p-2  items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            {tags.map(tag => (
              <span
                key={tag}
                className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"
              >
                {tag}
              </span>
            ))}
          </div>
          <Feature label="Country" value={category} />
        </div>
      </Link>
    </div>
  )
}

Card.propTypes = {
  category: PropTypes.string.isRequired,
  image: PropTypes.shape({
    localFiles: PropTypes.array,
  }).isRequired,
  name: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    current: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
  }),
  slug: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
}

Card.defaultProps = {
  navigation: {},
}

export const query = graphql`
  fragment CardImageFragment on AirtableField {
    localFiles {
      childImageSharp {
        fluid(maxWidth: 800, maxHeight: 420, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
