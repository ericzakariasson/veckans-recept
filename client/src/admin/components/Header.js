import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Bar = styled.header`
  padding: 0 40px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
`

const Navigation = styled.nav`
  display: flex;
`

const Link = styled(NavLink)`
  font-size: 1.125rem;
  display: block;
  color: ${p => p.theme.main};
  font-weight: 600;
  text-decoration: none;
  padding: 20px 0;
  position: relative;

  &:not(:last-of-type) {
    margin-right: 40px;
  }

  &.active {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: ${p => p.theme.main};
      border-radius: 2px 2px 0 0;
    }
  }
`

const Header = ({ user }) => (
  <Bar>
    <Navigation>
      <Link to="/admin/recept">Recept</Link>
      <Link to="/admin/ingredienser">Ingredienser</Link>
      <Link to="/admin/enheter">Enheter</Link>
    </Navigation>
  </Bar>
)

Header.propTypes = {
  user: PropTypes.object,
}

export default Header
