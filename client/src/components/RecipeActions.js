import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import PropTypes from 'prop-types'

import { Unlock, Lock, Repeat } from 'react-feather'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  ${p => p.theme.media.tablet.up`
    margin-left: 40px;
  `}
`

export const Button = styled.button`
  border: none;
  background: none;
  margin: 0;
  outline: none;
  width: 48px;
  height: 48px;
  border-radius: 50px;
  padding: 0;
  transition: ${p => p.theme.transition};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    stroke-width: 2;
    transition: ${p => p.theme.transition};
  }
`

const Freeze = styled(Button)`
  display: none;
  border: ${p => (p.frozen ? 'none' : '1px solid #ccc')};
  margin-right: 20px;
  background: ${p => (p.frozen ? '#EEE' : 'none')};

  svg {
    rect {
      fill: ${p => (p.frozen ? '#666' : 'none')};
    }
  }

  &:hover {
    transition: ${p => p.theme.transition};
    border-color: rgba(0, 0, 0, 0.5);

    svg {
      stroke: rgba(0, 0, 0, 0.5);
    }
  }

  &:active {
    transition: ${p => p.theme.transition};
  }
`

const Replace = styled(Button)`
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: ${p => p.theme.transition};

  ${p =>
    p.animate &&
    css`
      animation: ${spin} 0.4s ease-in-out;
    `}

  &:hover {
    transition: ${p => p.theme.transition};
  }

  &:active {
    transition: ${p => p.theme.transition};
  }

  svg {
    color: ${p => p.theme.main};
  }
`

function Shuffle({ shuffle, frozen }) {
  const [animate, setAnimate] = useState(false)

  function handleClick() {
    setAnimate(true)
    shuffle()
  }

  return (
    <Replace
      animate={animate}
      disabled={frozen}
      onClick={handleClick}
      onAnimationEnd={() => setAnimate(false)}
    >
      <Repeat size={20} />
    </Replace>
  )
}

const RecipeActions = ({ freeze, frozen, replace }) => {
  return (
    <Wrapper>
      <Freeze frozen={frozen} onClick={freeze}>
        {frozen ? <Lock color="#222" /> : <Unlock color="#CCC" />}
      </Freeze>
      <Shuffle shuffle={replace} frozen={frozen} />
    </Wrapper>
  )
}

RecipeActions.propTypes = {
  frozen: PropTypes.bool.isRequired,
  freeze: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
}

export default RecipeActions
