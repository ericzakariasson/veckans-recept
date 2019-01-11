import React from 'react'
import styled from 'styled-components'

import Logo from './Logo'

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`

const Header = () => (
  <StyledHeader>
    <Logo size={260} />
  </StyledHeader>
)

export default Header
