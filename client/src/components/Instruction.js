import React from 'react'
import styled from 'styled-components'

const Item = styled.li`
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`

const Step = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ccc;
`

const Text = styled.p`
  line-height: 1.25;
`

const Instruction = ({ step, text }) => {
  return (
    <Item>
      <Step>Steg {step + 1}</Step>
      <Text>{text}</Text>
    </Item>
  )
}

export default Instruction
