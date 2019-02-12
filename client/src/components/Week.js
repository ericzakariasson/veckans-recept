import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_WEEK = gql`
  query GetWeek($id: Int!) {
    week(id: $id)
  }
`

const Week = ({ match }) => {
  const { id } = match.params

  return null
}

export default Week
