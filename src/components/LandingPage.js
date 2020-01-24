import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import '../fonts/inter.css'
import twitterSvg from '../icons/twitter.svg'
import linkedinSvg from '../icons/linkedin.svg'
import instagramSvg from '../icons/instagram.svg'
import topiaSvg from '../icons/topia.svg'
import earthM from '../assets/earth-m.png'
import earthNew from '../assets/earth-new.png'
import { Link } from 'gatsby'

const LandingPageStyle = createGlobalStyle`
  html {
    font-family: 'Inter', sans-serif;
  }
  body {
    background: #000;
    color: #fff;
    @media only screen and (min-width: 768px) {
      background-image: url(${earthNew});
      background-repeat: no-repeat;
      background-position: top right;
    }
    @media only screen and (max-width: 768px) {
      background-image: url(${earthM});
      background-repeat: no-repeat;
      background-position: top center;
    }
  }
`

const IFrameStyleContainer = styled.div`

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`
const IFrame = styled.iframe`
  position: absolute; 
  top: -219px; 
  bottom: 0px; 
  left: 0px; 
  right: 0px; 
  width: 1904px; 
  height: 1071px;
`

const Icon = styled.img`
  object-fit: contain;

  &:hover {
    opacity: .8;
  }
`

const TwitterIcon = styled(Icon)`
  width: 28px;
  height: 23px;
`

const LinkedinIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`

const InstagramIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`

const Footer = styled.div`
  display: flex;
`
const Icons = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
`

const Links = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      opacity: .8;
    }
  }
`

const Container = styled.div`
  @media only screen and (min-width: 768px) {
    margin-left: 100px;
    margin-top: 32px;
  }
  display: flex;
  flex-direction: column;
  min-height: 550px;
  max-height: 600px;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 360px;
`

const TopiaLogo = styled.img`
  width: 75px;
  height: 32px;
  object-fit: contain;
`

const Top = styled.div`
  @media only screen and (max-width: 768px) {
    text-align: center;
    margin-top: 36px;
  }
`

const RightMenu = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    display: block;
    position: absolute;
    right: 16px;
    top: 32px;
    font-size: 16px;
    font-weight: bold;

    a {
      color: #ffffff;
    }
  }
`

export default ({children}) => (
  <React.Fragment>
    <RightMenu>
      {/* <Link to='/app/login'>Login</Link> */}
    </RightMenu>
    <Container>
      <Top>
        <Link to='/'><TopiaLogo src={topiaSvg} alt='Topia - We accelerate social impact' /></Link>
      </Top>
      {children}
      <Footer>
        <Icons>
          <a href='https://twitter.com/topiaHQ'>
            <TwitterIcon src={twitterSvg} />
          </a>
          <a href='https://www.linkedin.com/company/topiahq/about/'>
            <LinkedinIcon src={linkedinSvg} />
          </a>
          <a href='https://www.instagram.com/topiahq/'>
            <InstagramIcon src={instagramSvg} />
          </a>
        </Icons>
        <Links><Link to='/imprint'>Imprint & Contact</Link></Links>
      </Footer>
    </Container>
    <LandingPageStyle />
    {/* <IFrameStyleContainer>
      <IFrame id="player" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="https://www.youtube.com/embed/tFFBUf_g6xw?autohide=1&amp;autoplay=0&amp;controls=0&amp;enablejsapi=1&amp;iv_load_policy=3&amp;loop=0&amp;modestbranding=1&amp;playsinline=1&amp;rel=0&amp;showinfo=0&amp;wmode=opaque&amp;origin=https%3A%2F%2Fwww.crowleycarbon.com&amp;widgetid=1" class="background-video ready"></IFrame>
    </IFrameStyleContainer> */}
  </React.Fragment>
)
