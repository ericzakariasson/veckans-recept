import React from 'react'
import styled from 'styled-components'

import Header from './Header'

const Wrapper = styled.div``

const Layout = ({ children }) => (
  <Wrapper>
    <Header />
    {children}
  </Wrapper>
)

export default Layout
