import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import TopiaSvg from '../../assets/svgs/topia.svg'
import AvatarSvg from '../../assets/svgs/user-avatar-default.svg'
import NotificationIcon from '../../assets/svgs/icon-notification.svg'
import HelpIcon from '../../assets/svgs/icon-help.svg'
import { userImageApiUrl } from '../../utils/routing'


const ProfilePageStyle = createGlobalStyle`
  html {
    font-family: 'Inter', sans-serif;
  }
  body {
    background-color: #f3f4f6;
    color: #212c30;
  }
`

const Divider = styled.div`
  width: 1px;
  height: 24px;
  opacity: 0.2;
  background-color: #96a7bb;
  margin: 0px 20px 0px 20px
`

const Navbar = styled.div`
  height: 46px;
  display: flex;
  justify-content: space-between;

  #logo {
    width: 368px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    path {
      fill: #29303d;
    }
  }

  #userBox {
    width: 368px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    #avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-size: cover;
      margin: 0px 11px 0px 0px
    }

    svg {
      margin: 0px 11px 0px 11px
    }


  }

  #searchBox {
    height: 100%;
    display: flex;
  }
`

const Container = styled.div`
  margin-top: 48px;
  display: flex;

  #menu {
    width: 368px;
    @media only screen and (max-width: 1028px) {
      display: none;
    }

    ul {
      list-style: none;
      position: fixed;
      margin: 10px 10px 10px 120px;
      li {
        a {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.14;
          color: #959ba6;
          text-decoration: none;
          display: block;
          padding: 13px 26px 13px 26px;

          &:hover {
            color: #212c30;
            background: #E8E9EB;
            border-radius: 3px;
          }
        }
      }
    }
  }

  #content {
    width: 100%;
    padding: 16px;
  }
`

const MiniAvatar = inject(`store`)(
    observer(
      ({store}) => {
        const { avatarFilename } = store.CurrentUser.user
        const avatar = avatarFilename
          ? <div id='avatar' style={{backgroundImage: `url(${userImageApiUrl(avatarFilename)})`}}></div>
          : <AvatarSvg style={{width: '24px'}} />

        return avatar
      }
    )
  )


const UserLayout = ({store, children}) => {
  return (
    <React.Fragment>
      <Navbar>
        <div id="logo">
          <Link to='/'>
            <TopiaSvg />
          </Link>
        </div>
        <div id='searchBox'></div>
        <div id="userBox">
          <NotificationIcon />
          <HelpIcon/>
          <Divider />
          <MiniAvatar />
        </div>
      </Navbar>
      <Container>
        <div id="menu">
          <ul>
            {store.isAdmin && <li><Link to='/admin'>Admin panel</Link></li>}
            <li><Link to='/app/projects'>Projects</Link></li>
            <li><Link to='/app/profile#profile'>Profile</Link></li>
            <li><Link to='/app/profile#organization'>Organization</Link></li>
            <li><Link to='/app/profile#account'>Account</Link></li>
            <li><Link to='/app/logout'>Logout</Link></li>
          </ul>
        </div>

        <div id='content'>
          {children}
        </div>
      </Container>
      <ProfilePageStyle/>
    </React.Fragment>
  )
}

export default inject(`store`)(UserLayout)
