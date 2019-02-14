import React from 'react'
import styled from 'styled-components'

import Logo from './Logo'

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
`

const Header = () => (
  <StyledHeader>
    <Logo />
  </StyledHeader>
)

export default Header
