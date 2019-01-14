import React from 'react'
import styled from 'styled-components'

const Fixed = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  background: #fff;
  padding: 10px;
`

const DayList = styled.ul`
  display: flex;
  list-style: none;
`

const DayIcon = styled.li`
  padding: 5px;
  text-transform: uppercase;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 3px;

  background: ${p => (p.enabled ? p.theme.main : p.theme.light)};
  color: ${p => (p.enabled ? '#FFF' : p.theme.main)};

  &:not(:last-of-type) {
    margin-right: 10px;
  }
`

const Bar = ({ days, toggle }) => {
  return (
    <Fixed>
      <DayList>
        {days.map(day => (
          <DayIcon
            key={day.name}
            onClick={() => toggle(day.index)}
            enabled={day.enabled}
          >
            {day.name.charAt(0)}
          </DayIcon>
        ))}
      </DayList>
    </Fixed>
  )
}

export default Bar
