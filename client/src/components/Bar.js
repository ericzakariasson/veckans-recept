import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Share } from 'react-feather'

import DaySelector from './DaySelector'

const Fixed = styled.aside`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  height: ${p => p.theme.barHeight};
  padding: 10px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.04);
  transition: ${p => p.theme.transition};

  ${p =>
    p.hide &&
    css`
      transform: translateY(100%);
    `}
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
  cursor: pointer;
  transition: ${p => p.theme.transition};

  background: ${p => (p.enabled ? p.theme.rgba.main(80) : p.theme.light)};
  color: ${p => (p.enabled ? '#FFF' : p.theme.main)};

  ${p =>
    p.active &&
    css`
      transform: translateY(-2px);
    `}

  &:not(:last-of-type) {
    margin-right: 5px;
  }
`

const Button = styled.button`
  color: #fff;
  border: none;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 12px 20px;
  font-size: 1.2em;
  font-weight: 600;
  outline: none;
  display: flex;
  cursor: pointer;
  transition: ${p => p.theme.transition};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
    transition: ${p => p.theme.transition};
  }

  &:active {
    transform: scale(0.99);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
    transition: ${p => p.theme.transition};
  }

  svg {
  }
`

const ShareButton = styled(Button)`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.main};

  svg {
    transform: translateY(-1px);
  }
  transition: ${p => p.theme.transition};
`

const ShuffleAll = styled(Button)`
  ${p => p.theme.media.mobile`
  display: none;
`}
`

const Bar = ({
  days,
  enabledDays,
  toggle,
  refetch,
  daysToRefetch,
  setActiveIndex,
  activeIndex,
  share,
}) => {
  const currentDay = enabledDays[activeIndex] ? enabledDays[activeIndex] : null
  const shareIndex = enabledDays.length

  return (
    <Fixed hide={shareIndex === activeIndex}>
      <MaxWidth>
        {/* <DayList>
          {days.map((day, i) => (
            <DayIcon
              key={day.name}
              onClick={() => toggle(day.index)}
              enabled={day.enabled}
              active={day.name === activeDayName}
            >
              {day.name.charAt(0)}
            </DayIcon>
          ))}
        </DayList> */}
        <DaySelector toggle={toggle} days={days} currentDay={currentDay} />
        <ShareButton onClick={() => setActiveIndex(shareIndex)}>
          <Share size={18} color="#FFF" />
        </ShareButton>
        <ShuffleAll onClick={refetch}>Slumpa {daysToRefetch} recept</ShuffleAll>
      </MaxWidth>
    </Fixed>
  )
}

Bar.propTypes = {
  days: PropTypes.array.isRequired,
  daysToRefetch: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default Bar
