import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Share } from 'react-feather'

import DaySelector from './DaySelector'

const Fixed = styled.aside`
  position: absolute;
  z-index: 11;
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
  isSelected,
}) => {
  const currentDay = enabledDays[activeIndex] ? enabledDays[activeIndex] : null
  const shareIndex = enabledDays.length //Last, after all enabled days

  const hide = shareIndex === activeIndex || isSelected

  return (
    <Fixed hide={hide}>
      <MaxWidth>
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
