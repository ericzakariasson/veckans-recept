import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'

import { Transition } from 'react-spring'

import Day from './Day'
import DayPlaceholder from './DayPlaceholder'

const Wrapper = styled.main`
  max-width: ${p => p.theme.maxWidth};
  width: 100vw;
  flex: 1;
`

const SwipeList = styled(SwipeableViews)`
  height: 100%;
  padding: 0 20px;

  .react-swipeable-view-container {
    height: 100%;
  }
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
      <SwipeList slideStyle={{ padding: '0 10px 20px 10px' }}>
        {loading ? (
          <DayPlaceholder />
        ) : (
          /*  <Transition
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
              )}
          </Transition> */
          recipes.map((recipe, index) => (
            <Day
              key={recipe.id}
              day={enabledDays[index] || null}
              recipe={recipe}
              frozen={isFrozen(index)}
              actions={{
                freeze: toggleFrozen.bind(null, index),
                refetch: replaceOne.bind(null, index),
              }}
            />
          ))
        )}
      </SwipeList>
    </Wrapper>
  )
}

Week.propTypes = {
  days: PropTypes.array,
  enabledDays: PropTypes.array,
  loading: PropTypes.bool,
  recipes: PropTypes.array,
  replaceOne: PropTypes.func,
  toggleFrozen: PropTypes.func,
}

export default Week
