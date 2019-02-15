import React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'

import Instruction from './Instruction'
import Ingredient from './Ingredient'

import { Label } from './Label'

const Wrapper = styled(animated.div)`
  padding: 20px;
`

const Content = styled.div`
  padding-bottom: 40px;
`

const Description = styled.p`
  line-height: 1.25;
  font-size: 1rem;
  margin-bottom: 40px;
`

const Subtitle = styled(Label)`
  font-size: 1.125rem;
`

const Area = styled.section`
  &:not(:last-of-type) {
    margin-bottom: 40px;
  }
`

const Section = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`

const SectionName = styled.h3``

const List = styled.ul`
  list-style: none;
`

const FullRecipe = ({ style, bind, sections, instructions, description }) => {
  return (
    <Wrapper style={style}>
      <Content {...bind}>
        <Description>{description}</Description>
        <Area>
          <Subtitle as="h2">Ingredienser</Subtitle>
          {sections.map(section => (
            <Section key={section.order}>
              {section.name && <SectionName>{section.name}</SectionName>}
              <List>
                {section.ingredients.map(ingredient => (
                  <Ingredient key={ingredient.item.name} {...ingredient} />
                ))}
              </List>
            </Section>
          ))}
        </Area>
        <Area>
          <Subtitle as="h2">Instruktioner</Subtitle>
          <List>
            {instructions.map(({ step, text }) => (
              <Instruction key={step} step={step} text={text} />
            ))}
          </List>
        </Area>
      </Content>
    </Wrapper>
  )
}

export default FullRecipe
