import React from 'react'
import styled from 'styled-components'
import DayPlaceholder from './DayPlaceholder'
import SaveWeek from './SaveWeek'
import { useWindowSize } from '../hooks'
import SwipeableViews from 'react-swipeable-views'
import MobileRecipe from './MobileRecipe'
import RecipeActions from './RecipeActions'

import { Wrapper as Day, Name } from './Day'

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

const RecipeSlider = ({
  recipes,
  loading,
  setActiveIndex,
  activeIndex,
  createWeek,
  fetchRecipe,
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
  const windowSize = useWindowSize()

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
            <Day key={recipe.index}>
              <Name>{recipe.day.name}</Name>
              <MobileRecipe
                frozen={recipe.frozen}
                recipe={recipe}
                maximize={select}
                maximized={selected === recipe.id}
                windowSize={windowSize}
              />
              <RecipeActions
                frozen={recipe.frozen}
                replace={recipe.replace}
                freeze={recipe.freeze}
              />
            </Day>
          ))}
          <SaveWeek createWeek={createWeek} />
        </SwipeList>
      )}
    </Wrapper>
  )
}

export default RecipeSlider
