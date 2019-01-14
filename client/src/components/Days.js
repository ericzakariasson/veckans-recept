import React from 'react'
import styled from 'styled-components'

const DayList = styled.ul`
  list-style: none;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
`

const Day = styled.li`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`

const Days = ({ days }) => (
  <DayList>
    {days.map(day => (
      <Day key={day.name}>{day.name}</Day>
    ))}
  </DayList>
)

export default Days
