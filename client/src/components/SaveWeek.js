import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Ink from 'react-ink'
// import { MessageCircle, Link2 } from 'react-feather'

import { Label } from './Label'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  flex: 1;
  align-items: center;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${p => p.theme.black};
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

const Area = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 40px;
  }
`

// const Providers = styled.ul`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `

/* eslint-disable */
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ /* eslint-ignore */
/* eslint-enable */

const SaveWeek = ({ createWeek }) => {
  const [email, setEmail] = useState('')

  function handleChange(e) {
    setEmail(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    createWeek(email)
  }

  // function openSms() {
  //   const body =
  //     'Hej! Här kommer dina recept för veckan.\nhttps://veckansrecept.nu/vecka/2'
  //   const sms = `sms:${' '}&body=${encodeURI(body)}`

  //   window.location.href = sms
  // }

  const isValid = EMAIL_REGEX.test(email)

  return (
    <Wrapper>
      <Title>Spara din veckoplanering</Title>
      <Area>
        <Label>E-post</Label>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="dinadress@epost.se"
          />
          <SendButton disabled={!isValid}>
            Skicka
            <Ink />
          </SendButton>
        </Form>
      </Area>
      {/* <Area>
        <Label>Dela</Label>
        <Providers>
          <Provider icon={Link2} text="Kopiera länk" />
          <Provider icon={MessageCircle} text="SMS" onClick={openSms} />
        </Providers>
      </Area> */}
    </Wrapper>
  )
}

SaveWeek.propTypes = {
  createWeek: PropTypes.func,
}
/*
const Card = styled.li`
  background: #fff;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`

const IconWrapper = styled.div`
  padding: 7px;
  background: ${p => p.theme.rgba.main(10)};
  color: ${p => p.theme.main};
  border-radius: 5px;
`

const Text = styled.span`
  font-size: 1.125rem;
  color: ${p => p.theme.black};
  display: block;
  padding: 0 20px;
  font-weight: 600;
`

const Provider = ({ icon: Icon, text, onClick }) => (
  <Card onClick={onClick}>
    <IconWrapper>
      <Icon />
    </IconWrapper>
    <Text>{text}</Text>
  </Card>
) 
*/

export default SaveWeek
