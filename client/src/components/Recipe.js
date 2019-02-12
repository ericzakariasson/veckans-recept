import React from 'react'
import styled from 'styled-components'
import { useTransition, animated, config } from 'react-spring'
import PropTypes from 'prop-types'

export const Card = styled(animated.div)`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.04);
  width: 100%;
  transition: ${p => p.theme.transition};
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #fff;
  margin-bottom: 15px;
  height: 100%;
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
  width: 100%;
  flex: 1;

  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 150%;
    height: 25%;
    border-radius: 100%;
    background: #fff;
    transform: translate(-50%, -15%);
  }
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

const Recipe = ({ frozen, recipe }) => {
  const transition = useTransition(recipe, recipe.id, {
    from: { transform: `rotate(-10deg)` },
    enter: { transform: `rotate(0deg)` },
    leave: { transform: `rotate(10deg)` },
    unique: true,
    initial: false,
    config: config.stiff,
  })

  return (
    <Card frozen={frozen.toString()}>
      {transition.map(
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
      )}
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
