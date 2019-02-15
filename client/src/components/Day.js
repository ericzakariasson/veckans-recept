import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { animated, useTransition } from 'react-spring'

import Recipe from './Recipe'
import RecipeActions from './RecipeActions'

import { Label } from './Label'

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
  height: 100%;
  justify-content: space-between;
`

const Name = Label

const Day = ({ style, day, frozen, recipe, maximize, maximized, i }) => {
  return (
    <Wrapper style={style}>
      <Name>{day.name}</Name>
      <Recipe
        frozen={recipe.frozen}
        recipe={recipe}
        maximize={maximize}
        maximized={maximized}
        i={i}
      />
      <RecipeActions
        frozen={frozen}
        replace={recipe.replace}
        freeze={recipe.freeze}
      />
    </Wrapper>
  )
}

Day.propTypes = {
  style: PropTypes.object,
  day: PropTypes.object,
  frozen: PropTypes.bool,
  recipe: PropTypes.object,
}

export default Day
