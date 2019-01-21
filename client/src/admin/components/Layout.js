import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from './Header'

const Content = styled.main`
  padding: 40px;
  padding-top: 100px;
`

const Layout = ({ children }) => (
  <>
    <Header />
    <Content>{children}</Content>
  </>
)

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
