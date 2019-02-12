import React, { useState } from 'react'
import styled from 'styled-components'
import { useTransition, animated, config } from 'react-spring'
import { ChevronDown, Check } from 'react-feather'
import Ink from 'react-ink'

const Wrapper = styled.div`
  position: relative;
`

const Background = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.02);
  width: 100%;
  height: 100%;
  z-index: -1;
`

const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 5px;
  background: ${p => p.theme.rgba.main(10)};
  color: ${p => p.theme.main};
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-weight: 700;
  font-size: 1.125rem;
  position: relative;

  svg {
    margin-left: 5px;
  }
`

const Popup = styled(animated.div)`
  background: #fff;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  transform-origin: 0 100%;
`

const List = styled.ul`
  list-style: none;
`

const Day = styled.li`
  font-size: 1.2rem;
  font-weight: ${p => (p.active ? 700 : 400)};
  position: relative;

  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid ${p => p.theme.main};
    transition: ${p => p.theme.transition};
    transform: translateY(-50%);
    background: ${p => (p.enabled ? p.theme.main : 'none')};
  }

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`

const DaySelector = ({ days, activeDayName, toggle }) => {
  const [open, setOpen] = useState(false)

  const transition = useTransition(open, null, {
    from: { opacity: 0, transform: 'scale3d(1, 0.9, 1)' },
    enter: { opacity: 1, transform: 'scale3d(1, 1, 1)' },
    leave: { opacity: 0, transform: 'scale3d(1, 0.9, 1)' },
    config: config.stiff,
  })

  return (
    <>
      <Wrapper>
        {transition.map(
          ({ item, props, key }) =>
            open && (
              <Popup style={props} key={key}>
                <List>
                  {days.map(day => (
                    <Day
                      active={day.name === activeDayName}
                      key={day.name}
                      enabled={day.enabled}
                      onClick={() => toggle(day.index)}
                    >
                      {day.name}
                    </Day>
                  ))}
                </List>
              </Popup>
            )
        )}
        <Button onClick={() => setOpen(!open)}>
          Dagar <ChevronDown size={26} />
          <Ink />
        </Button>
      </Wrapper>
      {transition.map(
        ({ item, props, key }) =>
          open && (
            <Background
              onClick={() => setOpen(false)}
              style={{ opacity: props.opacity }}
              key={key}
            />
          )
      )}
    </>
  )
}

export default DaySelector
