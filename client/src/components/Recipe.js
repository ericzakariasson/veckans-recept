import React from 'react'
import styled from 'styled-components'
import { Transition, animated, config } from 'react-spring'
import PropTypes from 'prop-types'

export const Card = styled(animated.div)`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.04);
  width: 100%;
  transition: ${p => p.theme.transition};
  position: relative;
  flex: 1;
  overflow: hidden;
  margin-bottom: 20px;
`

const Image = styled.div`
  position: relative;
  background-image: url(${p => p.url});
  background-size: cover;
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
`

const Title = styled.h1`
  font-size: 1.3em;
  font-family: ${p => p.theme.fonts.body};
  font-weight: 600;
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

const Inner = styled(animated.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`

const Recipe = ({
  id,
  frozen,
  image,
  title,
  time,
  difficulty,
  numberOfIngredients,
}) => (
  <Card frozen={frozen.toString()}>
    {/* <Transition
      items={recipeProps}
      keys={id}
      unique
      native
      initial={null}
      from={{ transform: 'translate3d(0, -100%, 0)' }}
      enter={{ transform: 'translate3d(0, 0%, 0)' }}
      leave={{ transform: 'translate3d(0, 100%, 0)' }}
      config={config.gentle}
    >
      {({ image, title, time, difficulty, numberOfIngredients }) => styles => (
      )}
    </Transition> */}
    <Inner>
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
  </Card>
)

Recipe.propTypes = {
  id: PropTypes.number.isRequired,
  frozen: PropTypes.bool,
  image: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.number,
  difficulty: PropTypes.string,
  numberOfIngredients: PropTypes.number,
}

export default Recipe
