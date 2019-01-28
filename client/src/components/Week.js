import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Transition } from 'react-spring'

import Day from './Day'

const Wrapper = styled.main`
  display: flex;
  margin: 0 auto;
  max-width: 1000px;
  padding-bottom: 60px;
  max-width: ${p => p.theme.maxWidth};
  margin: 0 auto;
`

const List = styled.section`
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
      <List>
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
              <Day
                style={styles}
                day={enabledDays[index] || null}
                recipe={recipe}
                frozen={isFrozen(index)}
                actions={{
                  freeze: toggleFrozen.bind(null, index),
                  refetch: replaceOne.bind(null, index),
                }}
              />
            )}
          </Transition>
        )}
      </List>
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
