import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { popup, PopupContainer, WeekCreatedMessage } from './Popup'

import Header from '../components/Header'
import Week from '../components/Week'
import Bar from '../components/Bar'
import MailWeek from '../components/MailWeek'

import { WEEK_DAYS as initialDays } from '../constanst'

const Wrapper = styled.div`
  padding: 40px;

  ${p => p.theme.media.tablet`
    padding: 40px 20px;
  `}
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

    setDays(newDays)

    const fetchOneMore = !day.enabled

    const equalIndex = d => d.index === dayIndex

    const updatedEnabledDays = fetchOneMore
      ? filterEnabled(newDays)
      : enabledDays

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

    popup({ props: { url: '/vecka/2' }, component: WeekCreatedMessage })
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

  if (error) {
    console.log(error)
  }

  return (
    <Wrapper>
      <PopupContainer />
      <Header />
      <MailWeek createWeek={createWeek} />
      <Week
        days={dayArray}
        enabledDays={enabledDays}
        loading={loading}
        recipes={recipes}
        replaceOne={replaceOne}
        toggleFrozen={toggleFrozen}
      />
      <Bar
        days={dayArray}
        toggle={toggleEnabled}
        refetch={refetchNotFrozen}
        daysToRefetch={enabledAndNotFrozen.length}
      />
    </Wrapper>
  )
}

App.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(App)
