import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Text = styled.span`
  display: block;
  font-family: ${p => p.theme.fonts.display};
  font-weight: 700;
  color: ${p => p.theme.main};
  font-size: 2em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 48px;
    height: 2px;
    background: ${p => p.theme.black};
    left: 50%;
    top: 100%;
    transform: translate(-50%, 10px);
  }
`

const Logo = ({ size }) => <Text>Veckans Recept</Text>

Logo.propTypes = {
  size: PropTypes.number,
}

export default Logo
