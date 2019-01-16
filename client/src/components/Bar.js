import React from 'react'
import styled from 'styled-components'

const Fixed = styled.aside`
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 10px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.04);
`

const MaxWidth = styled.div`
  max-width: ${p => p.theme.maxWidth};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Button = styled.button`
  background: ${p => p.theme.gradient};
  color: #fff;
  border: none;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 12px 40px;
  font-size: 1.2em;
  font-weight: 600;
  outline: none;
  cursor: pointer;
`

const Bar = ({ days, toggle, refetch, daysToRefetch }) => {
  return (
    <Fixed>
      <MaxWidth>
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
        <Button onClick={refetch}>Slumpa {daysToRefetch} recept</Button>
      </MaxWidth>
    </Fixed>
  )
}

export default Bar
