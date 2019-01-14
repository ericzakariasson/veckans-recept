import React, { useState } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Recipe from './Recipe'
import Days from './Days'
import Bar from './Bar'
import RecipeActions from './RecipeActions'

import { WEEK_DAYS } from '../constanst'

const RECIPES = gql`
  query RandomRecipes($limit: Int!, $ids: [Int]!) {
    randomRecipes(limit: $limit, ids: $ids) {
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

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`

const Week = () => {
  const [days, setDays] = useState(WEEK_DAYS)

  function freeze(dayIndex) {
    const day = days[dayIndex]

    setDays({
      ...days,
      [day.index]: {
        ...day,
        frozen: !day.frozen,
      },
    })
  }

  function toggle(dayIndex) {
    const day = days[dayIndex]

    setDays({
      ...days,
      [day.index]: {
        ...day,
        enabled: !day.enabled,
      },
    })
  }

  function refetchOne(fetchMore, index, ids) {
    fetchMore({
      variables: { limit: 1, ids },
      updateQuery: (prev, { fetchMoreResult, variables }) => {
        const { randomRecipes } = prev
        const newRecipe = fetchMoreResult.randomRecipes[0]

        const newArr = Object.assign([], randomRecipes, { [index]: newRecipe })
        return {
          ...prev,
          randomRecipes: newArr,
        }
      },
    })
  }

  const mapRecipeToIndex = indexes => (obj, recipe, i) => {
    const recipeIndex = parseInt(indexes[i], 10)
    obj[recipeIndex] = recipe
    return obj
  }

  function update(fetchMore, indexes, ids) {
    fetchMore({
      variables: { limit: indexes.length, ids },
      updateQuery: (prev, { fetchMoreResult, variables }) => {
        const mapped = fetchMoreResult.randomRecipes.reduce(
          mapRecipeToIndex(indexes),
          {}
        )

        return {
          ...prev,
          randomRecipes: prev.randomRecipes.map((recipe, i) =>
            indexes.includes(i) ? mapped[i] : recipe
          ),
        }
      },
    })
  }

  const limit = Object.keys(days).filter(day => days[day].enabled).length

  const dayArray = Object.keys(days).map(day => days[day])
  const enabledDays = dayArray.filter(day => day.enabled)
  const enabledAndNotFrozen = enabledDays.filter(day => !day.frozen)

  return (
    <Query query={RECIPES} variables={{ limit, ids: [] }}>
      {({ data, loading, error, updateQuery, fetchMore }) => {
        const ids =
          data.randomRecipes &&
          data.randomRecipes.map(recipe => parseInt(recipe.id, 10))

        return (
          <Wrapper>
            <Bar days={dayArray} toggle={toggle} />
            <Days days={enabledDays} />
            <Recipes>
              {loading
                ? null
                : data.randomRecipes.map((recipe, i) => (
                    <Recipe
                      key={recipe.id}
                      frozen={days[i].frozen}
                      {...recipe}
                    />
                  ))}
            </Recipes>
            <Actions>
              {enabledDays.map((day, i) => (
                <RecipeActions
                  key={day.name}
                  frozen={day.frozen}
                  freeze={() => freeze(day.index)}
                  refetch={() => refetchOne(fetchMore, i, ids)}
                />
              ))}
            </Actions>
          </Wrapper>
        )
      }}
    </Query>
  )
}

export default Week
