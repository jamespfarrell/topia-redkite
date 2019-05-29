import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import LandingPage from '../components/LandingPage'
import SEO from '../components/SEO'
import axios from 'axios'
import { newsletterUrl } from '../utils/routing'

const Header = styled.h1`
  @media only screen and (max-width: 375px) {
    font-size: 30px;
    text-align:center;
  }
  font-size: 48px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.08;
  letter-spacing: normal;
  color: #ffffff;
`

const SubHeader = styled.h2`
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #ffffff;
`

const EmailInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 2px;
  background-color: #333;
  font-size: 16px;
  -webkit-appearance: none;
  outline: none;
  color: #999;
  text-indent: 18px;
  margin-bottom: 16px;
  display: block;
  border: ${props => props.status === 'idle' ? `1px solid #333` : null};
  border: ${props => props.status === 'error' ? `1px solid #ff2a00` : null};
  border: ${props => props.status === 'success' ? `1px solid #13c266` : null};
  box-sizing: border-box;

  &:focus {
    color: #fff;
    border: 1px solid #fff;
  }
`

const SubmitBtn = styled.button`
  display: block;
  width: 100%;
  height: 48px;
  border-radius: 2px;
  background-color: ${props => props.status === 'success' ? '#13c266' : '#ffffff'};
  color: ${props => props.status === 'success' ? '#fff' : '#000'};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  -webkit-appearance: none;
  outline: none;
  border: 0;

  &:focus {
    -webkit-appearance: none;
    outline: none;
  }

  &:hover {
    opacity: .9;
  }
`

const FormContainer = styled.div`
`

const Prompt = styled.p`
  font-size: 14px;
  color: #ffffff;
`

const validateEmail = email => {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}


export default () => {
  const emailInput = useRef(null)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState(null)

  const submitClick = async () => {
    const email = emailInput.current.value

    if (validateEmail(email)) {
      try {
        await axios.post(newsletterUrl, { email })
        setErrorMsg(null)
        setStatus('success')
      } catch (e) {
        if (e.response.status === 409) {
          setErrorMsg('You are already signed up. You’ll hear from us soon.')
          setStatus('success')
        } else {
          setErrorMsg('Cannot add your email at the moment.')
          setStatus('error')
        }
      }
    } else {
      setErrorMsg('Please check your email again.')
      setStatus('error')
    }
  }

  return <LandingPage>
    <SEO />
    <FormContainer>
      <Header>We accelerate social impact.</Header>
      <SubHeader>
        Stay in the loop and get early access when we’re ready for the main stage.
      </SubHeader>
      <EmailInput
        status={status}
        ref={emailInput}
        type='text'
        placeholder='Your Email'
        disabled={status === 'success'}
      />
      {errorMsg && <Prompt>{errorMsg}</Prompt>}
      <SubmitBtn onClick={submitClick} status={status} disabled={status === 'success'}>
        {status === 'success' ? 'Great, we will be in touch soon 🤘🏻' : 'Keep me posted'}
      </SubmitBtn>
    </FormContainer>
  </LandingPage>
}
