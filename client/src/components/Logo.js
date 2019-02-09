import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Text = styled.h1`
  display: block;
  font-family: ${p => p.theme.fonts.display};
  font-weight: 700;
  color: ${p => p.theme.main};
  font-size: 2em;
  position: relative;
`

const Logo = ({ size }) => <Text>Veckans Recept</Text>

Logo.propTypes = {
  size: PropTypes.number,
}

export default Logo
