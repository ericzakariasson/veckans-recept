import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { popup, PopupContainer, WeekCreatedMessage } from './Popup'

import Header from '../components/Header'
import Days from '../components/Days'
import Bar from '../components/Bar'
import Pagination from '../components/Pagination'

import { WEEK_DAYS as initialDays } from '../constanst'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fcfcfc;
`

const TextWrapper = styled.div`
  padding: 80px 0;
`

const NoRecipes = styled.h1`
  text-align: center;
  font-weight: 500;
  margin-bottom: 1rem;
`

const TryAgain = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #aaa;
`

const QUERY_RECIPES = gql`
  query GetRandomRecipes($limit: Int!, $ids: [Int]!) {
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

const QUERY_RECIPE = gql`
  query GetRecipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      image
      time
      difficulty
      numberOfIngredients
      description
      instructions {
        step
        text
      }
      sections {
        order
        ingredients {
          item {
            name
          }
          amount
          unit {
            short
          }
        }
      }
    }
  }
`

const CREATE_WEEK = gql`
  mutation CreateWeek($input: WeekInput) {
    createWeek(input: $input) {
      url
    }
  }
`

const daysToArray = days => Object.keys(days).map(day => days[day])

const filterEnabled = days =>
  Object.keys(days)
    .filter(day => days[day].enabled)
    .map(day => days[day])

const filterEnabledAndNotFrozen = days =>
  Object.keys(days)
    .filter(day => days[day].enabled && !days[day].frozen)
    .map(day => days[day])

const App = ({ client }) => {
  const [days, setDays] = useState(initialDays)
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState('')

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    initialFetch()
  }, [])

  const dayArray = daysToArray(days)
  const enabledDays = filterEnabled(days)
  const enabledAndNotFrozen = filterEnabledAndNotFrozen(days)

  const defaultParams = {
    limit: enabledDays.length,
  }

  async function fetchRecipes(limit = defaultParams.limit) {
    const ids = recipes.map(recipe => recipe.id)

    const { data, error: err } = await client.query({
      query: QUERY_RECIPES,
      variables: { limit, ids },
    })

    if (err) {
      return setError(err)
    }

    return {
      randomRecipes: data.randomRecipes.map((recipe, index) => ({
        ...recipe,
        index,
      })),
    }
  }

  async function fetchRecipe(id) {
    const { data } = await client.query({
      query: QUERY_RECIPE,
      variables: { id },
    })

    console.log(data)

    const { recipe } = data
    const index = recipes.findIndex(r => r.id === id)

    const updatedRecipes = Object.assign([], recipes, { [index]: recipe })

    setRecipes(updatedRecipes)
  }

  async function initialFetch() {
    const { randomRecipes } = await fetchRecipes()
    setRecipes(randomRecipes)
    setLoading(false)
  }

  function toggleFrozen(dayIndex) {
    console.log(dayIndex)
    const day = days[dayIndex]

    const newDays = {
      ...days,
      [day.index]: {
        ...day,
        frozen: !day.frozen,
      },
    }

    setDays(newDays)
  }

  async function toggleEnabled(dayIndex) {
    const day = days[dayIndex]

    const newDays = {
      ...days,
      [day.index]: {
        ...day,
        enabled: !day.enabled,
      },
    }

    const enabledNewDays = filterEnabled(newDays)

    const isLastEnabledDay = enabledNewDays.length === 0

    if (isLastEnabledDay) {
      return
    }

    setDays(newDays)

    const fetchOneMore = !day.enabled

    const equalIndex = d => d.index === dayIndex

    const updatedEnabledDays = fetchOneMore ? enabledNewDays : enabledDays

    const index = updatedEnabledDays.findIndex(equalIndex)

    fetchOneMore ? await insertOne(index) : removeOne(index)
  }

  function removeOne(index) {
    const newRecipes = [...recipes]
    newRecipes.splice(index, 1)
    setRecipes(newRecipes)
  }

  async function insertOne(index) {
    const { randomRecipes } = await fetchRecipes(1)
    const newRecipe = randomRecipes[0]
    const updatedRecipes = [...recipes]
    updatedRecipes.splice(index, 0, newRecipe)
    setRecipes(updatedRecipes)
  }

  async function replaceOne(index) {
    const { randomRecipes } = await fetchRecipes(1)
    const newRecipe = randomRecipes[0]

    const updatedRecipes = Object.assign([], recipes, { [index]: newRecipe })
    setRecipes(updatedRecipes)
  }

  const mapRecipeToDay = indexes => (obj, recipe, i) => {
    const recipeIndex = indexes[i]
    obj[recipeIndex] = recipe
    return obj
  }

  async function refetchNotFrozen() {
    const dayIndexes = enabledAndNotFrozen.map(day => day.index)
    const { randomRecipes } = await fetchRecipes(enabledAndNotFrozen.length)
    const mappedRecipes = randomRecipes.reduce(mapRecipeToDay(dayIndexes), {})
    const updatedRecipes = recipes.map((recipe, i) =>
      dayIndexes.includes(i) ? mappedRecipes[i] : recipe
    )
    setRecipes(updatedRecipes)
  }

  async function createWeek(email) {
    const recipeInput = enabledDays.map((day, i) => ({
      day: day.name,
      order: i,
      recipeId: recipes[i].id,
    }))

    /* const { data, err } = client.mutate({
      mutation: CREATE_WEEK,
      variables: {
        input: {
          email,
          week: recipeInput,
        },
      },
    }) */

    popup({ props: { id: 2 }, component: WeekCreatedMessage })
  }

  function fetchFull(id) {}

  function isFrozen(index) {
    return enabledDays[index] ? days[index].frozen : false
  }

  function bindRecipe(recipe, index) {
    return {
      ...recipe,
      freeze: toggleFrozen.bind(null, index),
      replace: replaceOne.bind(null, index),
      frozen: isFrozen(index),
      day: enabledDays[index] || null,
    }
  }

  if (!loading && recipes.length === 0) {
    return (
      <Wrapper>
        <Header />
        <TextWrapper>
          <NoRecipes>Hittade inga recept</NoRecipes>
          <TryAgain>Testa igen om en stund</TryAgain>
        </TextWrapper>
      </Wrapper>
    )
  }

  const dayPages = recipes.map((_, i) => ({ number: i }))

  const pages = [
    ...dayPages,
    { number: recipes.length, last: true }, // Last page
  ]

  return (
    <Wrapper>
      <PopupContainer />
      <Header />
      <Days
        days={dayArray}
        enabledDays={enabledDays}
        loading={loading}
        recipes={recipes.map(bindRecipe)}
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        createWeek={createWeek}
        fetchRecipe={fetchRecipe}
        selected={selected}
        setSelected={setSelected}
      >
        <Pagination pages={pages} active={activeIndex} />
        <Bar
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          days={dayArray}
          isSelected={selected !== ''}
          enabledDays={enabledDays}
          toggle={toggleEnabled}
          refetch={refetchNotFrozen}
          daysToRefetch={enabledAndNotFrozen.length}
        />
      </Days>
    </Wrapper>
  )
}

App.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(App)
