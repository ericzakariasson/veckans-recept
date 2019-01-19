import React from 'react'
import styled from 'styled-components'
import { Transition, animated, config } from 'react-spring'

import Day from './Day'
import RecipeActions from './RecipeActions'

const Card = styled(animated.div)`
  border-radius: 6px;
  background: #fff;
  box-shadow: ${p =>
    p.frozen
      ? '0 2px 4px rgba(0, 0, 0, 0.08)'
      : '0 4px 16px rgba(0, 0, 0, 0.08)'};
  transform: scale(${p => (p.frozen ? 0.98 : 1)});

  flex: 1;
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
`

const Image = styled.div`
  flex: 1;

  position: relative;
  background-image: url(${p => p.url});
  background-size: cover;

  &::before {
    content: '';
    padding-top: 100%;
    display: block;
  }
`

const Content = styled.div`
  padding: 20px;
  flex: 7;
`

const Title = styled.h1`
  font-size: 1.4em;
  font-family: ${p => p.theme.fonts.body};
  font-weight: 600;
  margin-bottom: 10px;
  white-space: pre;
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

const Wrapper = styled(animated.article)`
  display: flex;
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`

const Inner = styled(animated.div)`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const Recipe = ({
  style,
  day,
  id,
  /* title,
  image,
  time,
  difficulty,
  numberOfIngredients, */
  frozen,
  freeze,
  refetch,
  ...recipeProps
}) => (
  <Wrapper style={style}>
    <Day day={day} />
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
        {({
          image,
          title,
          time,
          difficulty,
          numberOfIngredients,
        }) => styles => (
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
    <RecipeActions frozen={frozen} freeze={freeze} refetch={refetch} />
  </Wrapper>
)

export default Recipe
