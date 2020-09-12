import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { Cards, Hero, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

export default ({ data }) => {
  const { items } = data
  // console.log("Data", items.nodes)
  const [category, setCategory] = useState([])
  const [values, setValues] = useState([])
  const [sorted, setSorted] = useState([])

  useEffect(() => {
    let temp = items.nodes.map(val => {
      return val.data.category
    })
    setValues(items.nodes)
    setCategory([...new Set(temp)])
  }, [])

  function handleTag(tag) {
    const temparr = values
      .filter(item => item.data.category === tag)
      .map(item => item)
    setSorted(temparr)
  }

  // console.log(sorted, "sorted")

  return (
    <Layout>
      <SiteMetadata
        title="Curated List of apps for Makers"
        description="List of apps for makers and nocode developers"
        image={data.hero.url}
      />

      {/* <Hero
        image={data.hero}
        tag="#travel"
        title="Travel destinations"
        description="Check the most popular travel locations in Europe."
      /> */}
      <div className="container text-center">
        <div
          key={"All"}
          className="p-2  items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <button
            onClick={e => handleTag("all")}
            className="bg-blue-500 focus:outline-none focus:shadow-outline hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            All
          </button>
        </div>
        {category.map(tag => (
          <div
            key={tag}
            className="p-2  items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            <button
              onClick={e => handleTag(tag)}
              className="bg-blue-500 focus:outline-none focus:shadow-outline hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              {tag}
            </button>
          </div>
        ))}
      </div>

      {/*  */}

      <Cards
        nodes={sorted.length > 1 || sorted.length === 1 ? sorted : values}
      />
      {/* <Cards nodes={items.nodes} /> */}
    </Layout>
  )
}

//data: {{tags: {eq: ${tag}}}}

export const query = graphql`
  query IndexQuery($tableName: String!) {
    hero: file(relativePath: { eq: "hero-travel.jpg" }) {
      ...HeroImageFragment
    }
    items: allAirtable(filter: { table: { eq: $tableName } }) {
      nodes {
        data {
          category
          image {
            ...CardImageFragment
          }
          name
          slug
          summary
          tags
        }
      }
    }
  }
`
