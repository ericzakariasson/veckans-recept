import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Ingredient from './Ingredient'
import CompactRecipe from './CompactRecipe'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fcfcfc;
  padding: 40px;
  padding-top: 90px;
`

const Recipes = styled.ul`
  margin-bottom: 40px;
`

const Ingredients = styled.ul``

const GET_WEEK = gql`
  query GetWeek($id: Int!) {
    week(id: $id) {
      id
      recipes {
        day
        recipe {
          title
          image
          sections {
            ingredients {
              item {
                name
                id
              }
              unit {
                name
                short
              }
              amount
            }
          }
        }
      }
    }
  }
`

function reduceIngredients(recipes) {
  const totalIngredients = {}

  recipes.forEach(({ recipe }) => {
    recipe.sections.forEach(({ ingredients }) => {
      ingredients.forEach(({ amount, unit, item }) => {
        const { name } = item
        if (!totalIngredients[name]) {
          totalIngredients[name] = {
            unit: {},
            amount: 0,
            item: {},
          }
        }

        const ingredient = totalIngredients[name]

        const prevAmount = ingredient.amount
        const newAmount = prevAmount + amount
        ingredient.amount = newAmount
        ingredient.unit = unit
        ingredient.item = item
      })
    })
  })

  return totalIngredients
}

const Week = ({ match }) => {
  const { id } = match.params

  return (
    <Query query={GET_WEEK} variables={{ id: Number(id) }}>
      {({ data, loading }) => {
        if (loading) {
          return null
        }

        const { week } = data
        const totalIngredients = reduceIngredients(week.recipes)
        const ingredients = Object.keys(totalIngredients).map(
          key => totalIngredients[key]
        )

        return (
          <Wrapper>
            <Recipes>
              {week.recipes.map(recipe => (
                <CompactRecipe key={recipe.day} {...recipe} />
              ))}
            </Recipes>
            <Ingredients>
              {ingredients.map(ingredient => (
                <Ingredient key={ingredient.item.name} {...ingredient} />
              ))}
            </Ingredients>
          </Wrapper>
        )
      }}
    </Query>
  )
}

export default Week
