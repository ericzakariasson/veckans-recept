import React from 'react'
import styled from 'styled-components'

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
        {loading
          ? null
          : recipes.map((recipe, i) => (
              <Recipe key={recipe.id} frozen={days[i].frozen} {...recipe} />
            ))}
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
