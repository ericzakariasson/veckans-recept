import React from 'react'
import styled from 'styled-components'

import { Transition, animated } from 'react-spring'

const Name = styled(animated.span)`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 100px;

  &:not(:last-of-type) {
  }
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
    from={{ opacity: 0 }}
  >
    {day => day !== null && (style => <Name style={style}>{day.name}</Name>)}
  </Transition>
)
export default Day
