import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Share } from 'react-feather'

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
  cursor: pointer;
  transition: ${p => p.theme.transition};

  background: ${p => (p.enabled ? p.theme.main : p.theme.light)};
  color: ${p => (p.enabled ? '#FFF' : p.theme.main)};

  &:not(:last-of-type) {
    margin-right: 5px;
  }

  &:hover {
    transform: scale(1.05);
    background: ${p => (p.enabled ? p.theme.main : p.theme.rgba.main(15))};
  }
`

const Button = styled.button`
  background: ${p => p.theme.gradient};
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
    margin-left: 10px;
  }
`

const ShareButton = styled(Button)``

const ShuffleAll = styled(Button)`
  ${p => p.theme.media.mobile`
  display: none;
`}
`

const Bar = ({ days, toggle, refetch, daysToRefetch, share }) => {
  return (
    <Fixed>
      <MaxWidth>
        {/*  <DayList>
          {days.map(day => (
            <DayIcon
              key={day.name}
              onClick={() => toggle(day.index)}
              enabled={day.enabled}
            >
              {day.name.charAt(0)}
            </DayIcon>
          ))}
        </DayList> */}
        <ShareButton onClick={share}>
          Spara <Share size={20} color="#FFF" />
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
