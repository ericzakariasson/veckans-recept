import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTransition, animated } from 'react-spring'

export const Name = styled(animated.span)`
  margin-bottom: 1rem;
  color: #717775;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.1em;
`

const Day = ({ day }) => {
  // const props = useTransition(day, day => day.name, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  // })

  return day ? <Name>{day.name}</Name> : null
}

Day.propTypes = {
  day: PropTypes.object,
}

export default Day
