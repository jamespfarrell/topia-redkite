import React, { useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import TopiaSvg from '../../assets/svgs/topia.svg'
import { Link } from 'gatsby'
import { inject } from 'mobx-react'
import AvatarSvg from '../../assets/svgs/user-avatar-default.svg'
import { userImageApiUrl } from '../../utils/routing'

const PageStyle = createGlobalStyle`
  html {
    font-family: 'Inter', sans-serif;
    padding: 0;
    margin: 0;
  }
  body {
    background-color: #f3f4f6;
    color: #212c30;

    padding: 0;
    margin: 0;
  }
`

const HeaderContainer = styled.div`
  background: #24b35f;
  display: flex;
  align-items: baseline;
  justify-content: center;
  font-family: Inter;
  flex-wrap: wrap;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000);

  @media only screen and (min-width: 768px) {
    height: 344px;
  }
`

const MetricBall = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  margin: 4px;
  color: #ffffff;
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
`

const Top = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;

  #container {
    width: 100%;
    max-width: 940px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 768px) {
      padding: 16px;
    }

    #logoBox {
      path {
        fill: #ffffff;
      }
    }

    #userBox {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.57;
      color: #ffffff;
      display: inline-flex;
      align-items: center;

      #avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 14px;
        background-size: cover;
      }
    }
  }
`

const OrganizationData = styled.div`
  width: 100%;
  max-width: 940px;
  height: 96px;
  display: flex;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    height: 333px;
  }

  #logo {
    border-radius: 50%;
    width: 96px;
    height: 96px;
    background: #fff;
    margin-right: 32px;

    @media only screen and (max-width: 768px) {
      margin: 0;
    }
  }

  #titleBox {
    width: 366px;
    color: #ffffff;
    font-family: Inter;

    @media only screen and (max-width: 768px) {
      width: auto;
    }

    h1 {
      font-size: 24px;
      font-weight: 600;
      line-height: 1.33;
      margin: 0;
      padding: 0;
    }

    h2 {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.57;
      margin: 0;
      padding: 0;
    }
  }

  #supportBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;

    .btn {
      display: block;
      width: 148px;
      height: 40px;
      border-radius: 4px;
      background-color: #24b35f;
      color: #fff;
      text-align: center;
      line-height: 40px;
      text-decoration: none;

      &:hover {
        opacity: .8;
      }
    }
  }

  #topDonors {
    width: 196px;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.57;
    color: #ffffff;
    align-items: flex-end;
    flex-wrap: wrap;

    @media only screen and (max-width: 768px) {
      width: auto;
      justify-content: center;
    }

    #donorsContainer {
      width: 100%;
      display: inline-flex;

      @media only screen and (max-width: 768px) {
        justify-content: center;
      }

      .donor {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        border: solid 1px rgba(204, 206, 210, 0.4);
        background-color: #000000;
        margin: 4px;
      }
    }
  }

`

const Container = styled.div`
  max-width: 940px;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;

  @media only screen and (max-width: 768px) {
    padding: 16px;
  }
`

const StatsBox = styled.div`
  width: 100%;
  height: 144px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 2px 14px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;


  @media only screen and (min-width: 768px) {
    position: relative;
    top: -45px;
  }

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
  }

  .item {
    h2 {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.57;
      text-align: center;
      color: #b8bcc3;
      padding: 0;
      margin: 0;
    }

    h3 {
      font-size: 24px;
      font-weight: 600;
      line-height: 1.33;
      text-align: center;
      color: #383a44;
    }
  }
`

const MiniAvatar = ({user}) => {
  const { avatarFilename } = user
  const avatar = avatarFilename
    ? <div id='avatar' style={{backgroundImage: `url(${userImageApiUrl(avatarFilename)})`}}></div>
    : <AvatarSvg style={{width: '24px'}} />

  return avatar
}

const Layout = ({organization, children, store}) => {

  return <div>
    <PageStyle />
    <HeaderContainer>
      <Top>
        <div id='container'>
          <div id='logoBox'>
            <Link to='/'>
              <TopiaSvg />
            </Link>
          </div>
          <div id='userBox'>
            {store.CurrentUser.user.name}
            <MiniAvatar user={store.CurrentUser.user} />
          </div>
        </div>
      </Top>
      <OrganizationData>
        <div id='logo'></div>
        <div id='titleBox'>
          <h1>{organization.name}</h1>
          <h2>Tomohon, Sulawesi Utara · masarang.nl</h2>
          <MetricBall style={{border: 'solid 2px #00a721', backgroundColor: 'rgba(0, 167, 33, 0.2)'}}>
            2
          </MetricBall>
          <MetricBall style={{border: 'solid 2px #f5b222', backgroundColor: 'rgba(245, 178, 34, 0.2)'}}>
            4
          </MetricBall>
          <MetricBall style={{border: 'solid 2px #00bbee', backgroundColor: 'rgba(0, 187, 238, 0.2)'}}>
            13
          </MetricBall>
          <MetricBall style={{border: 'solid 2px #ef402c', backgroundColor: 'rgba(0, 187, 238, 0.2)'}}>
            14
          </MetricBall>
          <MetricBall style={{border: 'solid 2px #3eb049', backgroundColor: 'rgba(62, 176, 73, 0.2)'}}>
            15
          </MetricBall>
          <MetricBall style={{border: 'solid 2px #02558b', backgroundColor: 'rgba(2, 85, 139, 0.2)'}}>
            16
          </MetricBall>
        </div>
        <div id='topDonors'>
          Top Donors
          <div id='donorsContainer'>
            <div className='donor'></div>
            <div className='donor'></div>
            <div className='donor'></div>
          </div>

        </div>

        <div id='supportBox'>
          <Link to={`/app/ngo/${organization.id}/support`} className='btn'>
            Support
          </Link>
        </div>
      </OrganizationData>
    </HeaderContainer>
    <Container>
      <StatsBox>
        <div className='item'>
          <h2>CO₂ Reduction</h2>
          <h3>472t</h3>
        </div>
        <div className='item'>
          <h2>Trees planted</h2>
          <h3>6203</h3>
        </div>
        <div className='item'>
          <h2>Jobs created</h2>
          <h3>165</h3>
        </div>
      </StatsBox>
      {children}
    </Container>
  </div>
}

export default inject(`store`)(Layout)
