import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Unlock, Lock, Repeat } from 'react-feather'

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  ${p => p.theme.media.tablet.up`
    margin-left: 40px;
  `}
`

const Button = styled.button`
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
    transform: translateY(-1px);
    stroke-width: 1;
    transition: ${p => p.theme.transition};
  }
`

const Freeze = styled(Button)`
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
  background: ${p => p.theme.rgba.main(5)};
  opacity: ${p => (p.disabled ? 0.2 : 1)};
  transition: ${p => p.theme.transition};

  &:hover {
    background: ${p => p.theme.rgba.main(10)};
    transition: ${p => p.theme.transition};
  }

  &:active {
    background: ${p => p.theme.rgba.main(20)};
    transition: ${p => p.theme.transition};
  }

  svg {
    color: ${p => p.theme.main};
  }
`

const RecipeActions = ({ freeze, frozen, refetch }) => {
  return (
    <Wrapper>
      <Freeze frozen={frozen} onClick={freeze}>
        {frozen ? <Lock color="#222" /> : <Unlock color="#CCC" />}
      </Freeze>
      <Replace disabled={frozen} onClick={refetch}>
        <Repeat />
      </Replace>
    </Wrapper>
  )
}

RecipeActions.propTypes = {
  freeze: PropTypes.func,
  frozen: PropTypes.bool,
  refetch: PropTypes.func,
}

export default RecipeActions
