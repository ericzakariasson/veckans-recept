import React from 'react'
import styled from 'styled-components'

import { Transition } from 'react-spring'

import Recipe from './Recipe'
import Days from './Days'
import RecipeActions from './RecipeActions'

const Wrapper = styled.main`
  display: flex;
  margin: 0 auto;
  max-width: 1000px;
  padding-bottom: 120px;
  max-width: ${p => p.theme.maxWidth};
  margin: 0 auto;
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

const Week = ({ days, loading, recipes, replaceOne, toggleFrozen }) => {
  return (
    <Wrapper>
      <Days days={days} />
      <Recipes>
        {loading ? null : (
          <Transition
            native
            unique
            items={recipes}
            keys={recipe => recipe.id}
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
            {recipe => props => (
              <Recipe
                style={props}
                frozen={days[recipe.index].frozen}
                {...recipe}
              />
            )}
          </Transition>
        )}
      </Recipes>
      <Actions>
        {days.map((day, i) => (
          <RecipeActions
            key={day.name}
            frozen={day.frozen}
            freeze={toggleFrozen.bind(null, day.index)}
            refetch={replaceOne.bind(null, i)}
          />
        ))}
      </Actions>
    </Wrapper>
  )
}

export default Week
