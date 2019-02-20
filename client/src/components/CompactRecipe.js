import React from 'react'
import styled from 'styled-components'

import { Label } from './Label'

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Card = styled.div`
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.06);
  height: 100px;
  overflow: hidden;
`

const Image = styled.div`
  background: url(${p => p.url});
  background-size: cover;
  height: 100%;
  width: 100px;
`

const Compact = ({ day, recipe }) => {
  console.log(recipe)

  return (
    <Wrapper>
      <Label>{day}</Label>
      <Card>
        <Image url={recipe.image} />
      </Card>
    </Wrapper>
  )
}

export default Compact
