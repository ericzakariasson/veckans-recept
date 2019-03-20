import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { toast, ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const PopupContainer = styled(ToastContainer)`
  .Toastify__toast {
    max-height: none;
    border-radius: 0;
    background: none;
    color: unset;
    min-height: 0;
    padding: 10px;
    box-shadow: none;
    font-family: ${p => p.theme.fonts.body};
  }
`

const Wrapper = styled.div`
  border-radius: 5px;
  background: ${p => p.theme.main};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
  position: relative;
`

const Title = styled.h1`
  font-size: 1rem;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
`

const Link = styled(NavLink)`
  background: #fff;
  border-radius: 3px;
  color: ${p => p.theme.main};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  width: 100%;
  text-align: center;
  text-decoration: none;
  padding: 1rem;
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
`

export const WeekCreatedMessage = ({ id, closeToast }) => (
  <Wrapper>
    <Title>Din vecka är skickad</Title>
    <Link to={`/vecka/${id}`}>Visa vecka</Link>
    <Background onClick={closeToast} />
  </Wrapper>
)

export const popup = ({ props, component: Component, options }) => {
  toast(<Component {...props} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: false,
    closeButton: false,
    transition: Slide,
    ...options,
  })
}
