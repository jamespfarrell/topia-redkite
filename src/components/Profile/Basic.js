import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { ConfirmationBar, Line, UploadInput, InputWithLabel, SubmitButton } from '../Form'
import AvatarSvg from '../../assets/svgs/user-avatar-default.svg'
import BannerSvg from '../../assets/svgs/banner-default.svg'
import { updateProfile } from '../../utils/user'
import { avatarApiUrl } from '../../utils/routing'

const Card = styled.form`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(33, 44, 48, 0.15);
  background-color: #ffffff;
  padding: 20px 40px;

  .header {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    padding: 0px;
    margin: 0px;
    font-family: Inter;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.4;
    color: #383a44;
  }

  p {
    font-size: 14px;
    line-height: 1.57;
    color: #959ba6;
  }

  b {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.57;
    color: #212c30;
  }

  .row {
    display: flex;
    margin-top: 16px;

    .col {
    }
  }
`

const PreviewDiv = styled.div`
  width: 80px;
  height: 80px;
  background-size: cover;
`

const Preview = ({url}) =>
  <PreviewDiv style={{backgroundImage: `url(${url})`}}></PreviewDiv>

const Basic = ({store}) => {
  const { token } = store.CurrentUser
  const { name, email, avatarFilename } = store.CurrentUser.user
  const [userParams, setUserParams] = useState({
    name, email, avatarUrl: avatarApiUrl(avatarFilename)
  })
  const [ userBannerUrl, setUserBannerUrl ] = useState(null)
  const [ showConfirmation, setConfirmation] = useState(false)

  const handleAvatarUpload = e => {
    const avatarFile = e.target.files[0]
    const avatarUrl = URL.createObjectURL(avatarFile)
    const params = { ...userParams, avatarFile, avatarUrl }
    setUserParams(params)
  }

  const handleUserBannerUpload = e => {
    const file = e.target.files[0]
    setUserBannerUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await updateProfile({ token, ...userParams })
    store.UpdateProfile(response)
    setConfirmation(true)
    setTimeout(() => setConfirmation(false), 3000) // close after 3 sec.
  }

  const handleUpdate = (e) => {
    const params = {...userParams}
    params[e.target.name] = e.target.value
    setUserParams(params)
  }

  return (
  <Card onSubmit={handleSubmit}>
    {showConfirmation && <ConfirmationBar>
      <span role="img" aria-label='OK emoji'>✌️</span> Your changes have been saved.
    </ConfirmationBar>}
    <div className='header'>
      <div>
        <h1>Profile</h1>
        <p>Upload a profile picture or edit profile details here.</p>
      </div>
      <div style={{width: '90px'}}>
        <SubmitButton label='Save' />
      </div>
    </div>


    <Line />
    <div className='row' style={{marginTop: '42px', marginBottom: '42px'}}>
      <div className='col' style={{marginRight: '24px'}}>
        <b>Profile picture</b>

        <div className='row'>
          <div className='col' style={{marginRight: '24px'}}>
            {userParams.avatarUrl ? <Preview url={userParams.avatarUrl} /> : <AvatarSvg />}
          </div>
          <div className='col'>
            <UploadInput handler={handleAvatarUpload} name='avatarFile'>
              Upload new picture
            </UploadInput>
            <p>Recommended: 200x200px, max. size 2MB</p>
          </div>
        </div>
      </div>
      <div className='col'>
        <b>Profile banner</b>

        <div className='row'>
          <div className='col' style={{marginRight: '24px'}}>
            {userBannerUrl ? <Preview url={userBannerUrl} /> : <BannerSvg />}
          </div>
          <div className='col'>
            <UploadInput handler={handleUserBannerUpload} name='userBanner'>
              Upload new banner
            </UploadInput>
            <p>Recommended: 1200x480px, max. size 5MB</p>
          </div>
        </div>
      </div>
    </div>
    <Line />
    <div style={{width: '407px'}}>
      <InputWithLabel handleUpdate={handleUpdate} value={userParams.name} label='Name' type='text' name='name' />
      <InputWithLabel handleUpdate={handleUpdate} value={userParams.email} label='Email' type='email' name='email' />
    </div>
  </Card>
  )
}

export default inject(`store`)(observer(Basic))
