import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { animated } from 'react-spring'

import DayName from './DayName'
import Recipe from './Recipe'
import RecipeActions from './RecipeActions'

export const Wrapper = styled(animated.article)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
  height: 100%;
`

const Day = ({ style, day, frozen, recipe, actions }) => {
  return (
    <Wrapper>
      <DayName day={day} />
      <Recipe frozen={frozen} {...recipe} />
      <RecipeActions />
    </Wrapper>
  )
}

Day.propTypes = {
  style: PropTypes.object,
  day: PropTypes.object,
  frozen: PropTypes.bool,
  recipe: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
}

export default Day
