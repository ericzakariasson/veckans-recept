import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Transition, animated } from 'react-spring'

export const Name = styled(animated.span)`
  margin-bottom: 1rem;
  color: #bbb;
  text-transform: uppercase;
  font-weight: 600;
`

const Day = ({ day }) => (
  <Transition
    native
    unique
    reset
    items={day}
    initial={null}
    from={{ opacity: 0 }}
    enter={{ opacity: 1 }}
    leave={{ opacity: 0 }}
  >
    {day => day !== null && (style => <Name style={style}>{day.name}</Name>)}
  </Transition>
)

Day.propTypes = {
  day: PropTypes.object,
}

export default Day
