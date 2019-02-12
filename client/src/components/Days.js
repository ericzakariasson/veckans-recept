import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'

import Day from './Day'
import DayPlaceholder from './DayPlaceholder'
import MailWeek from './MailWeek'
import Pagination from './Pagination'

const Wrapper = styled.div`
  max-width: ${p => p.theme.maxWidth};
  width: 100vw;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const SwipeList = styled(SwipeableViews)`
  height: 100%;
  padding: 0 20px;

  .react-swipeable-view-container {
    height: 100%;
  }
`

const slideStyle = {
  padding: '0 10px 5px',
  position: 'relative',
}

const Days = ({
  recipes,
  loading,
  setActiveIndex,
  activeIndex,
  createWeek,
}) => {
  const dayPages = recipes.map((_, i) => ({ number: i }))

  const pages = [...dayPages, { number: recipes.length, last: true }]

  return (
    <Wrapper>
      {loading ? (
        <DayPlaceholder />
      ) : (
        <SwipeList
          onChangeIndex={i => setActiveIndex(i)}
          index={activeIndex}
          slideStyle={slideStyle}
        >
          {recipes.map(recipe => (
            <Day
              key={recipe.day.index}
              day={recipe.day}
              recipe={recipe}
              frozen={recipe.frozen}
            />
          ))}
          <MailWeek createWeek={createWeek} />
        </SwipeList>
      )}
      <Pagination pages={pages} active={activeIndex} />
    </Wrapper>
  )
}

Days.propTypes = {
  recipes: PropTypes.array,
  loading: PropTypes.bool,
  setActiveIndex: PropTypes.func,
  activeIndex: PropTypes.number,
  createWeek: PropTypes.func,
}

export default Days
