import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import Recipe from './Recipe'
import Days from './Days'
import Bar from './Bar'
import RecipeActions from './RecipeActions'

import { WEEK_DAYS as initialDays } from '../constanst'

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

const Week = ({ client }) => {
  const [days, setDays] = useState(initialDays)
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    initialFetch()
  }, [])

  const dayArray = Object.keys(days).map(day => days[day])
  const enabledDays = dayArray.filter(day => day.enabled)
  const enabledAndNotFrozen = enabledDays.filter(day => !day.frozen)

  const defaultParams = {
    limit: enabledDays.length,
    ids: recipes.map(recipe => recipe.id),
  }

  async function fetchRecipes(
    limit = defaultParams.limit,
    ids = defaultParams.ids
  ) {
    const { data, networkStatus, error, loading } = await client.query({
      query: RECIPES,
      variables: { limit, ids },
    })

    if (error) {
      setError(error)
    }

    return { data, loading, networkStatus }
  }

  async function initialFetch() {
    const { data } = await fetchRecipes()
    setRecipes(data.randomRecipes)
    setLoading(false)
  }

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

  async function toggle(dayIndex) {
    const day = days[dayIndex]

    const newDays = {
      ...days,
      [day.index]: {
        ...day,
        enabled: !day.enabled,
      },
    }

    const fetchOneMore = !day.enabled
    console.log(dayIndex)

    // fetchOneMore ? await fetchOne(index) : removeRecipe(index)
    // console.log(fetchOneMore)
    if (fetchOneMore) {
      const index = Object.keys(newDays)
        .map(id => newDays[id])
        .filter(d => d.enabled)
        .findIndex(d => d.index === dayIndex)
      console.log(index)
      await insertOne(index)
    } else {
      const index = enabledDays.findIndex(d => d.index === dayIndex)
      removeRecipe(index)
    }

    setDays(newDays)
  }

  function removeRecipe(index) {
    const newRecipes = [...recipes]
    console.log(index)
    newRecipes.splice(index, 1)
    console.log(newRecipes)
    setRecipes(newRecipes)
  }

  async function insertOne(index) {
    const { data } = await fetchRecipes(1)
    const newRecipe = data.randomRecipes[0]
    const updatedRecipes = [...recipes]
    updatedRecipes.splice(index, 0, newRecipe)
    console.log(recipes)
    console.log(updatedRecipes)
    setRecipes(updatedRecipes)
  }

  async function replaceOne(index) {
    const { data } = await fetchRecipes(1)
    console.log(index)
    const newRecipe = data.randomRecipes[0]
    const updatedRecipes = Object.assign([], recipes, { [index]: newRecipe })
    setRecipes(updatedRecipes)
  }

  const mapRecipeToIndex = indexes => (obj, recipe, i) => {
    const recipeIndex = indexes[i]
    obj[recipeIndex] = recipe
    return obj
  }

  async function refetchNotFrozen() {
    const indexes = enabledAndNotFrozen.map(day => day.index)
    console.log(indexes)
    // const { data } = await fetchRecipes(enabledAndNotFrozen.length)
    // const mapped = data.randomRecipes.reduce(mapRecipeToIndex(indexes), {})
  }

  return (
    <Wrapper>
      <Bar days={dayArray} toggle={toggle} />
      <Days days={enabledDays} />
      <Recipes>
        {loading
          ? null
          : recipes.map((recipe, i) => (
              <Recipe key={recipe.id} frozen={days[i].frozen} {...recipe} />
            ))}
      </Recipes>
      <Actions>
        {enabledDays.map((day, i) => (
          <RecipeActions
            key={day.name}
            frozen={day.frozen}
            freeze={freeze.bind(null, day.index)}
            refetch={replaceOne.bind(null, i)}
          />
        ))}
      </Actions>
    </Wrapper>
  )
}

export default withApollo(Week)
