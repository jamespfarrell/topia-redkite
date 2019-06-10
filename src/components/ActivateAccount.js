import React from 'react'
import { navigate } from 'gatsby'
import AuthLayout from '../components/AuthLayout'
import { inject } from 'mobx-react'
import { setPassword } from '../utils/user'
import SEO from '../components/SEO'
import {
  SubmitButton,
  InputWithLabel,
  ErrMsg,
  SubHeader
} from '../components/Form'

class Apply extends React.Component {
  state = {
    password: '',
    confirmation: '',
    error: null,
    errors: {},
    processing: false
  }

  handleUpdate = (event) => {
    this.setState({
      errors: {},
      error: null,
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { password, confirmation } = this.state
    const { token } = this.props

    if (password === '' || confirmation === '') {
      this.setState({error: 'Please fill all fields'})
      return
    }

    if (password !== confirmation) {
      this.setState({error: 'Your password and confirmation password do not match.'})
      return
    }

    if (password.length < 6) {
      this.setState({ errors: { password: 'At least 6 characters' } })
      return
    }

    this.setState({ processing: true })
    const response = await setPassword({password, token})
    console.log(response)
    if (response.status === 200) {
      this.setState({ error: null, processing: false })
      this.props.store.Login(response.data)
      navigate('/app/profile')
    } else if (response.statusCode === 409) {
      this.setState({
        processing: false,
        error: 'Invalid token.'
      })
    } else {
      this.setState({
        processing: false,
        error: 'Something went wrong.'
      })
    }
  }

  render() {
    if (this.props.store.isLoggedIn) { navigate('/app/profile') }

    const { processing, errors } = this.state

    return (
      <AuthLayout>
        <SEO title='Activate your account' />
        <h1>You are almost there</h1>
        <SubHeader>
        Please select a strong password with for your account to protect your data and log in later.
        </SubHeader>
        {this.state.error && <ErrMsg>{this.state.error}</ErrMsg>}
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
          }}
        >
          <InputWithLabel
            error={errors.password ? errors.password : null}
            type='password'
            label='Password'
            name='password'
            handleUpdate={this.handleUpdate}
          />
          <InputWithLabel
            type='password'
            label='Confirm Password'
            name='confirmation'
            handleUpdate={this.handleUpdate}
          />
          <SubmitButton
            label={processing ? "Please wait..." : "Let’s get started"}
            disabled={processing}
          />
        </form>
      </AuthLayout>
    )
  }
}

export default inject(`store`)(Apply)
