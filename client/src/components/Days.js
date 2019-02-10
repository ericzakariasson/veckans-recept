import React from 'react'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'
import { useTransition, animated } from 'react-spring'

import Day from './Day'

const Wrapper = styled(animated.div)`
  height: 100%;
`

const SwipeList = styled(SwipeableViews)`
  height: 100%;
  padding: 0 20px;

  .react-swipeable-view-container {
    height: 100%;
  }
`

const slideStyle = {
  padding: '0 10px 20px 10px',
  position: 'relative',
}

const Days = ({ recipes, style }) => {
  const transition = useTransition(recipes, recipe => recipe.id, {
    from: { transform: `translateX(-100%)` },
    enter: { transform: `translateX(0%)` },
    leave: { transform: `translateX(100%)` },
    unique: true,
    initial: false,
  })

  return (
    <Wrapper style={style}>
      <SwipeList slideStyle={slideStyle}>
        {recipes.map(recipe => (
          <Day
            key={recipe.day.index}
            day={recipe.day}
            recipe={recipe}
            frozen={recipe.frozen}
          />
        ))}
      </SwipeList>
    </Wrapper>
  )
}

export default Days
