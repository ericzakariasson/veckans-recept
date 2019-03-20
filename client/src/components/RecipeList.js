import React from 'react'
import styled from 'styled-components'
import { Wrapper as Day, Name } from './Day'
import DesktopRecipe from './DesktopRecipe'
import RecipeActions from './RecipeActions'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`

const RecipeList = ({ recipes, selected }) => {
  return (
    <Wrapper>
      {recipes.map(recipe => (
        <Day key={recipe.index}>
          <Name>{recipe.day.name}</Name>
          <DesktopRecipe frozen={recipe.frozen} recipe={recipe} />
          <RecipeActions
            frozen={recipe.frozen}
            replace={recipe.replace}
            freeze={recipe.freeze}
          />
        </Day>
      ))}
    </Wrapper>
  )
}

export default RecipeList
