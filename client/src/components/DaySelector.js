import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronDown, Check } from 'react-feather'
import Ink from 'react-ink'

import DaySelectorPopup from './DaySelectorPopup'

const Wrapper = styled.div`
  position: relative;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.01);
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

const DaySelector = ({ days, currentDay, toggle }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Wrapper>
        <DaySelectorPopup
          open={open}
          days={days}
          currentDay={currentDay}
          toggle={toggle}
        />
        <Button onClick={() => setOpen(!open)}>
          Dagar <ChevronDown size={26} />
          <Ink />
        </Button>
      </Wrapper>
      {open && <Background onClick={() => setOpen(false)} />}
    </>
  )
}

export default DaySelector
