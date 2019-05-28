import React from 'react'
import styled from 'styled-components'
import LandingPage from '../components/LandingPage'
import SEO from '../components/SEO'

const Text = styled.p`
  font-size: 20px;
`

export default () =>
  <LandingPage>
    <SEO />
    <Text><b>Imprint</b></Text>
    <Text>
      Alexander Haase & Friends<br/>
      Prenzlauer Allee 231<br/>
      10405 Berlin<br/>
      Germany<br/>
    </Text>

    <Text>
      Don’t be shy and say hi<br/>
      <b>hello@topia.us</b>
    </Text>
  </LandingPage>
