import React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'

const Card = styled(animated.article)`
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  position: relative;
  flex: 1;
  transform-origin: 0 0;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: ${p => p.theme.main};
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
    position: relative

    &::before {
      content: '•';
      margin-right: 10px;
    }
  }
`

const Recipe = ({
  style,
  id,
  title,
  image,
  time,
  difficulty,
  numberOfIngredients,
}) => (
  <Card style={style}>
    <Image url={image} />
    <Content>
      <Title>{title}</Title>
      <InfoList>
        <Info>{time} min</Info>
        <Info>{difficulty}</Info>
        <Info>{numberOfIngredients} ingredienser</Info>
      </InfoList>
    </Content>
  </Card>
)

export default Recipe
