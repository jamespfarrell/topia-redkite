import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { ConfirmationBar, Line, UploadInput, InputWithLabel, SubmitButton } from '../Form'
import { Card, Preview } from './Card'
import AvatarSvg from '../../assets/svgs/user-avatar-default.svg'
import BannerSvg from '../../assets/svgs/banner-default.svg'
import { updateProfile } from '../../utils/user'
import { userImageApiUrl } from '../../utils/routing'

const Basic = ({store}) => {
  const { token } = store.CurrentUser
  const { name, email, avatarFilename, bannerFilename } = store.CurrentUser.user
  const [userParams, setUserParams] = useState({
    name,
    email,
    avatarUrl: userImageApiUrl(avatarFilename),
    bannerUrl: userImageApiUrl(bannerFilename)
  })
  const [ showConfirmation, setConfirmation] = useState(false)

  const handleUserFileUpload = e => {
    const file = e.target.files[0]
    const urlParam = e.target.name === 'avatarFile' ? 'avatarUrl' : 'bannerUrl'
    setUserParams({
      ...userParams,
      [e.target.name]: file,
      [urlParam]: URL.createObjectURL(file)
    })
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
            <UploadInput handler={handleUserFileUpload} name='avatarFile'>
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
            {userParams.bannerUrl ? <Preview url={userParams.bannerUrl} /> : <BannerSvg />}
          </div>
          <div className='col'>
            <UploadInput handler={handleUserFileUpload} name='bannerFile'>
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
