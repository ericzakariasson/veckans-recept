import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'

import Day from './Day'
import DayPlaceholder from './DayPlaceholder'
import SaveWeek from './SaveWeek'
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
  z-index: 10;

  .react-swipeable-view-container {
    height: 100%;
    padding-top: 80px;
    padding-bottom: 103px;
  }
`

const slideStyle = {
  padding: '0 10px 5px',
}

const Days = ({
  recipes,
  loading,
  setActiveIndex,
  activeIndex,
  createWeek,
  fetchRecipe,
  children,
  selected,
  setSelected,
}) => {
  async function select(id) {
    const deselect = selected === id
    if (!deselect) {
      await fetchRecipe(id)
    }

    setSelected(deselect ? '' : id)
  }

  const isSelected = selected !== ''

  return (
    <Wrapper>
      {loading ? (
        <DayPlaceholder />
      ) : (
        <SwipeList
          onChangeIndex={i => setActiveIndex(i)}
          index={activeIndex}
          slideStyle={slideStyle}
          disabled={isSelected}
        >
          {recipes.map((recipe, i) => (
            <Day
              key={recipe.day.index}
              day={recipe.day}
              recipe={recipe}
              frozen={recipe.frozen}
              maximize={select}
              maximized={selected === recipe.id}
              i={i}
            />
          ))}
          <SaveWeek createWeek={createWeek} />
        </SwipeList>
      )}
      {children}
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
