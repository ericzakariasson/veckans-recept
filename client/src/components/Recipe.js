import React from 'react'
import styled from 'styled-components'
import { Transition, animated, config } from 'react-spring'
import PropTypes from 'prop-types'

const Card = styled(animated.div)`
  border-radius: 6px;
  background: #fff;
  box-shadow: ${p =>
    p.frozen
      ? '0 2px 4px rgba(0, 0, 0, 0.08)'
      : '0 4px 16px rgba(0, 0, 0, 0.08)'};
  transform: scale(${p => (p.frozen ? 0.98 : 1)});

  flex: 1;
  width: 100%;
  transition: ${p => p.theme.transition};
  position: relative;
  /* transform-origin: 0 0; */
  overflow: hidden;
  height: 90px;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: ${p => p.theme.main};
  }

  &:hover {
    transform: translateY(-2px) scale(1.005);
    box-shadow: ${p =>
      p.frozen
        ? '0 2px 4px rgba(0, 0, 0, 0.08)'
        : '0 4px 24px rgba(0, 0, 0, 0.08)'};
  }

  ${p => p.theme.media.tablet`
    margin-bottom: 20px;
  `}

  ${p => p.theme.media.mobile`
    height: 200px;
  `}
`

const Image = styled.div`
  position: relative;
  background-image: url(${p => p.url});
  background-size: cover;
  width: 100%;
  height: 100px;

  ${p => p.theme.media.mobile.up`
    flex: 1;
  
    &::before {
      content: '';
      padding-top: 100%;
      display: block;
    }
  `}
`

const Content = styled.div`
  padding: 20px;

  ${p => p.theme.media.mobile.up`
    flex: 7;
  `}
`

const Title = styled.h1`
  font-size: 1.4em;
  font-family: ${p => p.theme.fonts.body};
  font-weight: 600;
  margin-bottom: 10px;

  ${p => p.theme.media.mobile.up`
    white-space: pre;
  `}
`

const InfoList = styled.ul``

const Info = styled.li`
  display: inline-block;
  color: ${p => p.theme.main};
  font-weight: 700;

  &:not(:last-of-type) {
    margin-right: 10px;
  }

  &:not(:first-of-type) {
    position: relative;

    &::before {
      content: '•';
      margin-right: 10px;
    }
  }
`

const Inner = styled(animated.div)`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  ${p => p.theme.media.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`

const Recipe = ({ id, frozen, ...recipeProps }) => (
  <Card frozen={frozen.toString()}>
    <Transition
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
        <Inner style={styles}>
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
      )}
    </Transition>
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
