import React from 'react'
import { navigate } from 'gatsby'
import AuthLayout from './AuthLayout'
import { inject } from 'mobx-react'
import { Link } from 'gatsby'
import { handleLogin } from '../utils/auth'
import SEO from './SEO'
import {
  Line,
  Text,
  SubmitButton,
  InputWithLabel,
  ErrMsg
} from './Form'

class Login extends React.Component {
  state = {
    email: ``,
    password: ``,
    error: null,
  }

  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const response = await handleLogin(this.state)
    if (response.status === 200) {
      this.setState({ error: null })
      this.props.store.Login(response.data)
      navigate('/app/welcome')
    } else {
      this.setState({
        error: 'Email or password did not match our records. Please double-check and try again.'
      })
    }
  }

  render() {
    if (this.props.store.isLoggedIn) {
      navigate('/app/welcome')
    }

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
          <SubmitButton label="Sign In" />
          <Line />
          <Text>
            Don't have an account yet? <Link to='/imprint'>Apply now</Link>
          </Text>
          <Text>
            <Link to='/imprint'>I forgot my password</Link>
          </Text>
        </form>
      </AuthLayout>
    )
  }
}

export default inject(`store`)(Login)
