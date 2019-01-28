import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { animated } from 'react-spring'

import DayName from './DayName'
import Recipe from './Recipe'
import RecipeActions from './RecipeActions'

const Wrapper = styled(animated.article)`
  display: flex;
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`

const Day = ({ style, day, frozen, recipe, actions }) => {
  return (
    <Wrapper style={style}>
      <DayName day={day} />
      <Recipe frozen={frozen} {...recipe} />
      <RecipeActions {...actions} />
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
