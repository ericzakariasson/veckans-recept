import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.li`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
`

const X = styled.div`
  flex: 2;
`

const Amount = styled.span`
  margin-right: 5px;
`

const Unit = styled.span``

const Item = styled.p`
  flex: 8;
`

const Ingredient = ({ item, amount, unit }) => {
  return (
    <Wrapper>
      <X>
        <Amount>{amount}</Amount>
        <Unit>{unit ? unit.short : null}</Unit>
      </X>
      <Item>{item.name}</Item>
    </Wrapper>
  )
}

export default Ingredient
