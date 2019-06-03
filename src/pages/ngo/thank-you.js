import React from 'react'
import { Link } from 'gatsby'
import AuthLayout from '../../components/AuthLayout'
import SEO from '../../components/SEO'
import { SubHeader, SubmitButton } from '../../components/Form'

export default () =>
  <AuthLayout>
    <SEO title='Thank you' />
    <h1>Thank you</h1>
    <SubHeader>Your application has been successfully submitted.</SubHeader>
    <Link to='/'>
      <SubmitButton label='Go back to topia.us' />
    </Link>
  </AuthLayout>
