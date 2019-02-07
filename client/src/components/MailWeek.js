import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`

const Text = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #444;
`

const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
`

const Input = styled.input`
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  padding: 15px 18px;
  padding-right: 80px;
  outline: none;
  width: 100%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
  line-height: normal;
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
  -webkit-appearance: none;

  &::placeholder {
    color: #ddd;
  }
`

const SendButton = styled.button`
  background: none;
  border: none;
  color: ${p => (p.disabled ? '#CCC' : p.theme.main)};
  transition: ${p => p.theme.transition};
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 8px 10px;
  border-radius: 3px;
  outline: none;

  &:hover {
    transition: ${p => p.theme.transition};
    ${p =>
      !p.disabled &&
      css`
        background: ${p.theme.rgba.main(10)};
      `}
  }

  &:active {
    transition: ${p => p.theme.transition};
    ${p =>
      !p.disabled &&
      css`
        background: ${p.theme.rgba.main(20)};
      `}
  }
`
/* eslint-disable */
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ /* eslint-ignore */
/* eslint-enable */

const MailWeek = ({ createWeek }) => {
  const [value, setValue] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  function handleClick() {
    createWeek(value)
  }

  // const isValid = EMAIL_REGEX.test(value)
  const isValid = true

  return (
    <Wrapper>
      <Text>Maila veckoplanering</Text>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={value}
          onChange={handleChange}
          placeholder="dinadress@epost.se"
        />
        <SendButton onClick={handleClick} disabled={!isValid}>
          Skicka
        </SendButton>
      </Form>
    </Wrapper>
  )
}

MailWeek.propTypes = {
  createWeek: PropTypes.func,
}

export default MailWeek
