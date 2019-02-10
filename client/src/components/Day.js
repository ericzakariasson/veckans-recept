import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { animated, useTransition } from 'react-spring'

import DayName from './DayName'
import Recipe from './Recipe'
import RecipeActions from './RecipeActions'

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
  height: 100%;
`

const Day = ({ style, day, frozen, recipe }) => {
  return (
    <Wrapper style={style}>
      <DayName day={day} />
      <Recipe frozen={recipe.frozen} recipe={recipe} />
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
