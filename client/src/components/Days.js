import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useMedia from 'use-media'
import RecipeSlider from './RecipeSlider'
import RecipeList from './RecipeList'
import { sizes } from '../style'

const Days = ({
  recipes,
  loading,
  setActiveIndex,
  activeIndex,
  createWeek,
  fetchRecipe,
  selected,
  setSelected,
}) => {
  const isMobile = useMedia({ maxWidth: sizes.mobile })

  return isMobile ? (
    <RecipeSlider
      recipes={recipes}
      loading={loading}
      setActiveIndex={setActiveIndex}
      activeIndex={activeIndex}
      createWeek={createWeek}
      fetchRecipe={fetchRecipe}
      selected={selected}
      setSelected={setSelected}
    />
  ) : (
    <RecipeList
      recipes={recipes}
      loading={loading}
      setActiveIndex={setActiveIndex}
      activeIndex={activeIndex}
      createWeek={createWeek}
      fetchRecipe={fetchRecipe}
      selected={selected}
      setSelected={setSelected}
    />
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
