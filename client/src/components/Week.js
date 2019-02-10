import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import DayPlaceholder from './DayPlaceholder'
import Days from './Days'

const Wrapper = styled.main`
  max-width: ${p => p.theme.maxWidth};
  width: 100vw;
  flex: 1;
`

const Week = ({ loading, recipes }) => {
  return (
    <Wrapper>
      {loading ? <DayPlaceholder /> : <Days recipes={recipes} />}
    </Wrapper>
  )
}

Week.propTypes = {
  days: PropTypes.array,
  enabledDays: PropTypes.array,
  loading: PropTypes.bool,
  recipes: PropTypes.array,
}

export default Week
