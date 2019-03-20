import React from 'react'
import { useMeasure } from '../hooks'
import styled, { css } from 'styled-components'
import { useTransition, animated, config } from 'react-spring'
import PropTypes from 'prop-types'

import { X } from 'react-feather'

import FullRecipe from './FullRecipe'

export const Card = styled(animated.div)`
  background: #fff;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  background: #fff;
  border-radius: ${p => (p.maximized ? 0 : '10px')};
  z-index: ${p => (p.maximized ? 11 : 1)};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  height: 100px;

  /* 

  INSET
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    box-shadow: inset 0px 4px 16px rgba(0, 0, 0, 0.16);
  } 
  */
`

const Inner = styled(animated.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  transform-origin: 50% 500%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Image = styled.div`
  position: relative;
  background-image: url(${p => p.url});
  background-size: cover;
  background-color: #eee;
  flex: 1;
`

const Content = styled.div`
  padding: 20px;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 1.5em;
  font-family: ${p => p.theme.fonts.body};
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: 1rem;

  ${p => p.theme.media.mobile.up`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

const Minimize = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
  background: #222;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${p => p.theme.transition};
  position: absolute;
  top: 20px;
  right: 20px;

  ${p =>
    p.minimized &&
    css`
      transform: translate(15px, -80px);
    `}
`

const InfoList = styled.ul``

const Info = styled.li`
  display: inline-block;
  /* color: ${p => p.theme.main}; */
  color: #777;
  font-weight: 700;
  font-size: 1rem;

  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }

  &:not(:first-of-type) {
    position: relative;

    &::before {
      content: '•';
      margin-right: 0.5rem;
    }
  }
`

const Recipe = ({ frozen, recipe, style }) => {
  const transition = useTransition(recipe, recipe.id, {
    from: { opacity: 0, transform: `rotate(-15deg)` },
    enter: { opacity: 1, transform: `rotate(0deg)` },
    leave: { opacity: 0, transform: `rotate(15deg)` },
    unique: true,
    initial: false,
    config: config.stiff,
  })

  return (
    <Card style={style} frozen={frozen.toString()}>
      test
      {/* transition.map(
        ({
          item: { image, title, time, difficulty, numberOfIngredients },
          props,
          key,
        }) => (
          <Inner key={key} style={props}>
            <Image url={image} />
            <Content>
              <Title>{title}</Title>
              <InfoList>
                <Info>{time} min</Info>
                <Info>{difficulty}</Info>
                <Info>{numberOfIngredients} ingredienser</Info>
              </InfoList>
            </Content>
          </Inner>
        )
        )*/}
    </Card>
  )
}

Recipe.propTypes = {
  frozen: PropTypes.bool,
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.number,
    difficulty: PropTypes.string,
    numberOfIngredients: PropTypes.number,
  }),
}

export default Recipe
