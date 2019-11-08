import React from 'react'
import Layout from './Layout'
import styled from 'styled-components'
import { Link } from 'gatsby'
import SEO from '../SEO'
import { getOrganization } from '../../utils/organization'
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements'
import { SuccessButton, ConfirmationBar, Line, UploadInput, Label, InputWithLabel, SubmitButton } from '../Form'
import { FormContainer } from '../Profile/Card'
import { transactionsUrl } from '../../utils/routing'
import { inject } from 'mobx-react'

import "./Support.scss"
import axios from 'axios';


const CardBox = styled.div`
  max-width: 470px;
  margin: 0 auto;
`

const SubMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 36px;

  ul {
    list-display-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    li {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.57;
      color: #b8bcc3;
      display: inline;
      margin: 17px;
      padding: 9px;
      border-radius: 4px;

      a {
        color: #B8BCC3;
        text-decoration: none
      }

      a:hover {
        color: #383a44;
      }

      &.active {
        background-color: #E7E9EB;

        a {
          color: #383a44;
          font-weight: 600;
        }
      }
    }
  }
`

const createOptions = () => {
  return {
    style: {
      base: {
        background: '#fff',
        border: '1px solid red',
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

class _CardForm extends React.Component {
  state = {
    errorMessage: ''
  }



  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message})
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult)
    } else {
      console.log("Stripe.js hasn't loaded yet.")
    }
  }

  updateParams = (e) => {
    const { paymentParams, setPaymentParams } = this.props
    setPaymentParams({ ...paymentParams, [e.target.name]: e.target.value })
    console.log(paymentParams)
  }

  render() {
    const { org, paymentParams, setPaymentParams } = this.props
    const { initialValues } = this.state;

    return (
      <CardBox>
        <form onSubmit={this.handleSubmit}>
          <FormContainer>
            <InputWithLabel onChange={this.updateParams} value={paymentParams.name} label='Name' type='text' name='name' />
            <InputWithLabel onChange={this.updateParams} value={paymentParams.amount} label='Amount' type='text' name='amount' />
            <InputWithLabel onChange={this.updateParams} value={paymentParams.currency} label='Currency' type='text' name='currency' />
            <Label>
              Project
              <select name='projectId' onChange={this.updateParams}>
                {org.projects.map(project =>
                  <option key={project.id} value={project.id}>{project.name}</option>
                )}
              </select>
            </Label>
            <Label>
              Card details
              <CardElement
                className='cardInput'
                onChange={this.handleChange}
                {...createOptions()}
              />
            </Label>
            <SuccessButton>Pay</SuccessButton>
          </FormContainer>
        </form>
      </CardBox>
    )
  }
}

const CardForm = injectStripe(_CardForm)

const Page = ({store, id}) => {
  const [ success, setSuccessFlag ] = React.useState(false)
  const [ org, setOrg ] = React.useState({url: '', name: '', transactions: [], projects: []})
  const [ paymentParams, setPaymentParams ] = React.useState({
    currency: 'EUR',
    amount: '10',
    organizationId: id,
    projectId: 0,
    name: store.CurrentUser.user.name
  })

  React.useEffect(() => {
    const fetchOrganization = async () => {
      const response = await getOrganization(id)
      setOrg(response)
    }

    fetchOrganization()
  }, [])

  const handleResult = async (result) => {
    if(!result.error) {
      const stripeToken = result.token.id
      const { token } = store.CurrentUser
      const config = {
        headers: {
          'Authorization': token
        }
      }
      const response = await axios.post(transactionsUrl, { ...paymentParams, stripeToken }, config)
      if(response.status === 200) {
        setSuccessFlag(true)
      }
    }
  }

  return <Layout organization={org}>
  <SEO title='Support' />
  <SubMenu>
    <ul>
      <li><Link to={`/app/ngo/${id}`}>Impact</Link></li>
      <li><Link to={`/app/ngo/${id}/projects`}>Projects</Link></li>
      <li><Link to={`/app/ngo/${id}/donors`}>Donors</Link></li>
      <li><Link to={`/app/ngo/${id}/about`}>About</Link></li>
    </ul>
  </SubMenu>

  {!success && <StripeProvider apiKey="pk_test_pM29gNb9os7OGeceqMo3iw2V">
    <Elements>
      <CardForm org={org} setPaymentParams={setPaymentParams} paymentParams={paymentParams} handleResult={handleResult} />
    </Elements>
  </StripeProvider>}

  {success && <div>Payment sent! Thank you</div>}

</Layout>

}

export default inject(`store`)(Page)
