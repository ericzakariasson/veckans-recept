import React from 'react'
import Layout from './components/Layout'
import Board from './components/Board'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_ITEMS = gql`
  query AllItems {
    items {
      id
      name
    }
  }
`

const Ingredients = () => {
  return (
    <Layout>
      <Query query={ALL_ITEMS}>
        {({ loading, data, error }) => {
          if (loading) {
            return null
          }

          if (error) {
            throw Error(error)
          }

          return <Board title={`Ìngredienser`} data={data.items} />
        }}
      </Query>
    </Layout>
  )
}

export default Ingredients
