import React from 'react'
import { Link } from 'gatsby'
import TopiaSvg from '../../assets/svgs/topia.svg'
import styled, { createGlobalStyle } from 'styled-components'
import '../../fonts/inter.css'

const AuthPageStyle = createGlobalStyle`
  html {
    font-family: 'Inter', sans-serif;
  }
  body {
    background-color: #f3f4f6;
    color: #212c30;

    @media only screen and (max-width: 768px) {
      padding: 0px 16px 0px 16px
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const MenuBox = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 2px 14px 0 rgba(0, 0, 0, 0.05);
  padding: 16px;
  width: 300px;
  margin-right: 16px;
`
const ContentBox = styled.div`
  width: 100%;
  @media only screen and (min-width: 768px) {
    padding: 48px 80px 48px 80px;
  }
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 2px 14px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  padding: 48px 16px 48px 16px;

  h1 {
    font-family: Inter;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: #212c30;
    margin: 0;
    padding: 0;
    margin-bottom: 48px;
  }
`

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 128px;
  width: 100%;

  path {
    fill: #29303d;
  }
`

const Footer = styled.div`
  width: 100%;
  margin-top: 32px;
  font-size: 12px;
  line-height: 2;
  text-align: center;
  color: #959ba6;
`

const Layout = ({ children }) => (
  <Container>
    <Top>
      <Link to='/'>
        <TopiaSvg />
      </Link>
    </Top>
    <ContentContainer>
      <MenuBox>
        <ul>
          <li><Link to='/admin/users'>Users</Link></li>
          <li><Link to='/admin/organizations'>Organizations</Link></li>
          <li><Link to='/admin/newsletter'>Newsletter e-mails</Link></li>
        </ul>
      </MenuBox>
      <ContentBox>
        <main>{children}</main>
        <AuthPageStyle />
      </ContentBox>
    </ContentContainer>
    <Footer>
      <p>Terms of Service · Privacy Policy · Cookie use</p>
      <p>© Topia · Legal Notice · Contact & Feedback</p>
    </Footer>
  </Container>

)

export default Layout
