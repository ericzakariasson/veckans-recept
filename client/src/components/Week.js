import React, { useState } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Recipe from './Recipe'

const days = {
  0: {
    name: 'Måndag',
    recipe: null,
    frozen: false,
  },
  1: {
    name: 'Tisdag',
    recipe: null,
    frozen: false,
  },
  2: {
    name: 'Onsdag',
    recipe: null,
    frozen: false,
  },
  3: {
    name: 'Torsdag',
    recipe: null,
    frozen: false,
  },
  4: {
    name: 'Fredag',
    recipe: null,
    frozen: false,
  },
}

const RECIPES = gql`
  query RandomRecipes {
    randomRecipes(limit: 5) {
      id
      title
      image
      time
      difficulty
      numberOfIngredients
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1000px;
`

const Recipes = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const Days = styled.ul`
  list-style: none;
  margin-right: 40px;
`

const Day = styled.li``

const Week = () => {
  return (
    <Query query={RECIPES}>
      {({ data, loading, error }) => {
        if (loading) {
          return null
        }

        return (
          <Wrapper>
            <Recipes>
              {data.randomRecipes.map((recipe, i) => (
                <Recipe key={recipe.id} day={days[i]} {...recipe} />
              ))}
            </Recipes>
          </Wrapper>
        )
      }}
    </Query>
  )
}

export default Week
