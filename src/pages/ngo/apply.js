import React from 'react'
import { navigate } from 'gatsby'
import AuthLayout from '../../components/AuthLayout'
import { inject } from 'mobx-react'
import { Link } from 'gatsby'
import { onboardNGO } from '../../utils/auth'
import SEO from '../../components/SEO'
import {
  Line,
  Text,
  SubmitButton,
  InputWithLabel,
  ErrMsg,
  SubHeader
} from '../../components/Form'

class Apply extends React.Component {
  state = {
    email: '',
    name: '',
    orgName: '',
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
    const { email, name, orgName } = this.state
    if (email === '' || name === '' || orgName === '') {
      this.setState({error: 'Please fill all fields'})
      return
    }

    this.setState({ processing: true })
    const response = await onboardNGO({email, name, orgName})

    if (response.status === 200) {
      this.setState({ error: null, processing: false })
      navigate('/ngo/thank-you')
    } else if (response.statusCode === 409) {
      this.setState({
        processing: false,
        errors: { email: 'E-mail taken. Please use different one.' }
      })
    } else {
      this.setState({
        processing: false,
        error: 'We cannot create your account at the moment...'
      })
    }
  }

  render() {
    if (this.props.store.isLoggedIn) { navigate('/app/welcome') }

    const { processing, errors } = this.state

    return (
      <AuthLayout>
        <SEO title='Apply as an NGO' />
        <h1>Apply as an NGO</h1>
        <SubHeader>
          We are working hard to open Topia to the public soon, but currently
          only role out to selected NGOs. Please fill out the form so we can see
          if we can already help each other.
        </SubHeader>
        {this.state.error && <ErrMsg>{this.state.error}</ErrMsg>}
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
          }}
        >
          <InputWithLabel
            error={errors.email ? errors.email : null}
            type='email'
            label='Email'
            name='email'
            handleUpdate={this.handleUpdate}
          />
          <InputWithLabel
            type='text'
            label='Organization Name'
            name='orgName'
            handleUpdate={this.handleUpdate}
          />
          <InputWithLabel
            type='text'
            label='Full Name'
            name='name'
            handleUpdate={this.handleUpdate}
          />
          <SubmitButton
            label={processing ? "Please wait..." : "Apply"}
            disabled={processing}
          />
          <Line />
          <Text>
            Already got an account? <Link to='/app/login'>Sign in</Link>
          </Text>
        </form>
      </AuthLayout>
    )
  }
}

export default inject(`store`)(Apply)
