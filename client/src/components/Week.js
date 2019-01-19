import React from 'react'
import styled from 'styled-components'

import { Transition, config } from 'react-spring'

import Recipe from './Recipe'
import RecipeActions from './RecipeActions'

const Wrapper = styled.main`
  display: flex;
  margin: 0 auto;
  max-width: 1000px;
  padding-bottom: 60px;
  max-width: ${p => p.theme.maxWidth};
  margin: 0 auto;
`

const Recipes = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Week = ({
  days,
  enabledDays,
  loading,
  recipes,
  replaceOne,
  toggleFrozen,
}) => {
  function isFrozen(index) {
    return enabledDays[index] ? days[index].frozen : false
  }

  return (
    <Wrapper>
      <Recipes>
        {loading ? null : (
          <Transition
            native
            unique
            reset
            items={recipes}
            keys={(recipe, i) => i}
            trail={100}
            from={{
              opacity: 0,
            }}
            enter={{
              opacity: 1,
            }}
            leave={{
              opacity: 0,
            }}
          >
            {(recipe, state, index) => styles => (
              <Recipe
                day={enabledDays[index] || null}
                style={styles}
                frozen={isFrozen(index)}
                freeze={toggleFrozen.bind(null, index)}
                refetch={replaceOne.bind(null, index)}
                {...recipe}
              />
            )}
          </Transition>
        )}
      </Recipes>
    </Wrapper>
  )
}

export default Week
