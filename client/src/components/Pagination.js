import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.ul`
  display: flex;
  list-style: none;
  width: 100%;
  justify-content: center;
  padding: 15px 0;
`

const Dot = styled.li`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${p => (p.last ? p.theme.main : '#222')};
  transition: ${p => p.theme.transition};

  opacity: ${p => (p.active ? (p.last ? 1 : 0.8) : 0.2)};

  &:not(:last-of-type) {
    margin-right: 10px;
  }
`

const Pagination = ({ pages, active }) => (
  <Wrapper>
    {pages.map(page => (
      <Dot key={page.number} last={page.last} active={page.number === active} />
    ))}
  </Wrapper>
)

export default Pagination
