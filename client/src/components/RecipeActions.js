import React from 'react'
import styled from 'styled-components'

import { Unlock, Lock, Repeat } from 'react-feather'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
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
  cursor: pointer;

  svg {
    stroke-width: 1;
  }
`

const Freeze = styled(Button)`
  border: ${p => (p.frozen ? 'none' : '1px solid #ccc')};
  margin-right: 20px;

  background: ${p => (p.frozen ? p.theme.main : 'none')};
`

const Replace = styled(Button)`
  background: ${p => p.theme.light};

  opacity: ${p => (p.disabled ? 0.2 : 1)};

  svg {
    color: ${p => p.theme.main};
  }
`

const RecipeActions = ({ freeze, frozen, refetch }) => {
  return (
    <Wrapper>
      <Freeze frozen={frozen} onClick={freeze}>
        {frozen ? <Lock color="#FFF" /> : <Unlock color="#CCC" />}
      </Freeze>
      <Replace disabled={frozen} onClick={refetch}>
        <Repeat />
      </Replace>
    </Wrapper>
  )
}

export default RecipeActions
