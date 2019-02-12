import React from 'react'
import Layout from './Layout'
import Board from './Board'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_UNITS = gql`
  query AllUnits {
    units {
      id
      name
      short
      qty
      type
    }
  }
`

const Units = () => {
  return (
    <Layout>
      <Query query={ALL_UNITS}>
        {({ loading, data, error }) => {
          if (loading) {
            return null
          }

          if (error) {
            throw Error(error)
          }

          return <Board title={`Enheter`} data={data.units} />
        }}
      </Query>
    </Layout>
  )
}

export default Units
