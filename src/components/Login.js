import React from 'react'
import { navigate } from 'gatsby'
import AuthLayout from './AuthLayout'
import { inject } from 'mobx-react'
import { Link } from 'gatsby'
import { handleLogin } from '../utils/auth'
import { FacebookProvider, LoginButton } from 'react-facebook'
import { oauthFacebookUrl } from '../utils/routing'
import axios from 'axios'
import SEO from './SEO'
import {
  Line,
  Text,
  SubmitButton,
  InputWithLabel,
  ErrMsg
} from './Form'
import styled from 'styled-components'

const StyledFbButton = styled(LoginButton)`
  border-radius: 3px;
  border: 1px solid #365898;
  background-color: #365898;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  color: #ffffff;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 32px;

  &:hover {
    opacity: 0.8;
  }
`

class Login extends React.Component {
  state = {
    email: ``,
    password: ``,
    error: null,
    processing: false
  }

  handleUpdate = (event) => {
    this.setState({
      error: null,
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    if (this.state.email === '' || this.state.password === '') {
      this.setState({error: 'Please provide email and password'})
      return
    }

    this.setState({ processing: true })
    const response = await handleLogin(this.state)
    if (response.status === 200) {
      this.setState({ error: null, processing: false })
      this.props.store.Login(response.data)
      navigate('/app/profile')
    } else {
      this.setState({
        processing: false,
        error: 'Email or password did not match our records. Please double-check and try again.'
      })
    }
  }

  handleResponse = async ({profile, tokenDetail}) => {
    try {
      const apiResponse = await axios.post(oauthFacebookUrl, {
        fbId: profile.id,
        name: profile.name,
        email: profile.email,
        accessToken: tokenDetail.accessToken
      })
      this.props.store.Login(apiResponse.data)
      navigate('/app/profile')
    } catch(err) {
      if (err.statusCode === "409") {
        this.setState({
          error: `We already have different account with ${profile.email} email.`
        })
      } else {
        this.setState({
          error: `Something went wrong.`
        })
      }
    }
  }

  render() {
    if (this.props.store.isLoggedIn) {
      navigate('/app/profile')
    }

    const { processing } = this.state

    return (
      <AuthLayout>
        <SEO title='Sign In' />
        <h1>Sign In</h1>
        {this.state.error && <ErrMsg>{this.state.error}</ErrMsg>}
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
          }}
        >
          <InputWithLabel
            type='email'
            label='Email'
            name='email'
            handleUpdate={this.handleUpdate}
          />
          <InputWithLabel
            type='password'
            label='Password'
            name='password'
            handleUpdate={this.handleUpdate}
          />
          <SubmitButton
            label={processing ? "Please wait..." : "Sign In"}
            disabled={processing}
          />
          <Line />
          <FacebookProvider appId="1112520215598509">
            <StyledFbButton
              scope="email"
              onCompleted={this.handleResponse}
              onError={this.handleError}
            >
              <span>Login via Facebook</span>
            </StyledFbButton>
          </FacebookProvider>
          <Text>
            Don't have an account yet? <Link to='/ngo/apply'>Apply now</Link>
          </Text>
        </form>
      </AuthLayout>
    )
  }
}

export default inject(`store`)(Login)
