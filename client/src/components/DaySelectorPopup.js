import React from 'react'
import styled from 'styled-components'
import { useTransition, animated, config } from 'react-spring'
import { Check } from 'react-feather'

const Popup = styled(animated.div)`
  background: #fff;
  padding: 20px;
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
  font-weight: ${p => (p.current ? 700 : 400)};
  transition: 0.1s ease-in-out;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 10px;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`

const IconWrapper = styled.div`
  border-radius: 3px;
  border: 2px solid ${p => p.theme.main};

  background: ${p => (p.enabled ? p.theme.main : 'none')};
  transition: 0.1s ease-in-out;
  padding: 10px;
  position: relative;
  margin-right: 15px;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    stroke-width: 3;
  }
`

const DaySelectorPopup = ({ open, toggle, days, currentDay }) => {
  const transition = useTransition(open, null, {
    from: { opacity: 0, transform: 'rotateX(-15deg) translateY(10px)' },
    enter: { opacity: 1, transform: 'rotateX(0deg) translateY(0px)' },
    leave: { opacity: 0, transform: 'rotateX(-15deg) translateY(10px)' },
    config: { ...config.stiff, tension: 300 },
  })

  return transition.map(
    ({ item, props, key }) =>
      item && (
        <Popup key={key} style={props}>
          <List>
            {days.map(day => (
              <Day
                current={day.name === (currentDay && currentDay.name)}
                key={day.name}
                onClick={() => toggle(day.index)}
              >
                <IconWrapper enabled={day.enabled}>
                  <Check size={18} color="#FFF" />
                </IconWrapper>
                {day.name}
              </Day>
            ))}
          </List>
        </Popup>
      )
  )
}

export default DaySelectorPopup
