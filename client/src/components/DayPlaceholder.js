import React from 'react'
import styled from 'styled-components'
import { Card } from './Recipe'
import { Wrapper } from './Day'
import { Button } from './RecipeActions'

const WrapperPlaceholder = styled(Wrapper)`
  padding: 0 20px 20px;
`

const DayNamePlaceholder = styled.div`
  width: 64px;
  height: 16px;
  background: #eee;
  margin-bottom: 1rem;
`

const CardPlaceholder = styled(Card)`
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const ContentPlaceholder = styled.div`
  background: #fff;
  width: 100%;
  height: 120px;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`

const ButtonPlaceholder = styled(Button)`
  box-shadow: none;
  background: #fff;
`

const RecipePlaceholder = ({ style }) => (
  <WrapperPlaceholder style={style}>
    <DayNamePlaceholder />
    <CardPlaceholder>
      <ContentPlaceholder />
    </CardPlaceholder>
    <Buttons>
      <ButtonPlaceholder />
    </Buttons>
  </WrapperPlaceholder>
)

export default RecipePlaceholder
