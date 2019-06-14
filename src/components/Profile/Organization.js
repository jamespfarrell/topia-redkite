import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { navigate } from 'gatsby'
import { ConfirmationBar, Line, UploadInput, InputWithLabel, SuccessButton, SubmitButton } from '../Form'
import { Card, Preview, FormContainer, SaveBtnContainer } from './Card'
import AvatarSvg from '../../assets/svgs/user-avatar-default.svg'
import BannerSvg from '../../assets/svgs/banner-default.svg'
import { updateOrganization } from '../../utils/organization'

const Organization = ({store, id, name, logoUrl, bannerUrl}) => {
  const { token } = store.CurrentUser
  const [orgParams, setOrgParams] = useState({
    id, name, logoUrl, bannerUrl
  })
  const [ showConfirmation, setConfirmation] = useState(false)

  const handleOrganizationFileUpload = e => {
    const file = e.target.files[0]
    console.log(file)
    const urlParam = e.target.name === 'logoFile' ? 'logoUrl' : 'bannerUrl'
    setOrgParams({
      ...orgParams,
      [e.target.name]: file,
      [urlParam]: URL.createObjectURL(file)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await updateOrganization({ token, id, ...orgParams })
    if(response.status === 200) {
      setConfirmation(true)
      setTimeout(() => setConfirmation(false), 3000) // close after 3 sec.
    }
  }

  const handleUpdate = (e) => {
    setOrgParams({ ...orgParams, [e.target.name]: e.target.value })
  }

  return (
  <Card onSubmit={handleSubmit}>
    {showConfirmation && <ConfirmationBar>
      <span role="img" aria-label='OK emoji'>✌️</span> Your changes have been saved.
    </ConfirmationBar>}
    <div className='header'>
      <div>
        <h1>Organization</h1>
        <p>You can change your organization details here.</p>
      </div>
      <SaveBtnContainer>
        <SubmitButton label='Save' />
      </SaveBtnContainer>
    </div>

    <Line />
    <a href="#organization" id="organization"></a>
    <div className='row' style={{marginTop: '42px', marginBottom: '42px'}}>
      <div className='col' style={{marginRight: '24px'}}>
        <b>Organization picture</b>

        <div className='row'>
          <div className='col' style={{marginRight: '24px'}}>
            {orgParams.logoUrl ? <Preview url={orgParams.logoUrl} /> : <AvatarSvg />}
          </div>
          <div className='col'>
            <UploadInput handler={handleOrganizationFileUpload} name='logoFile'>
              Upload new picture
            </UploadInput>
            <p>Recommended: 200x200px, max. size 2MB</p>
          </div>
        </div>
      </div>
      <div className='col'>
        <b>Organization banner</b>

        <div className='row'>
          <div className='col' style={{marginRight: '24px'}}>
            {orgParams.bannerUrl ? <Preview url={orgParams.bannerUrl} /> : <BannerSvg />}
          </div>
          <div className='col'>
            <UploadInput handler={handleOrganizationFileUpload} name='bannerFile'>
              Upload new banner
            </UploadInput>
            <p>Recommended: 1200x480px, max. size 5MB</p>
          </div>
        </div>
      </div>
    </div>
    <Line />
    <FormContainer>
      <InputWithLabel
        handleUpdate={handleUpdate}
        value={orgParams.name}
        label='Organization name'
        type='text'
        name='name'
      />
    </FormContainer>
    <Line />
    <SuccessButton onClick={() => navigate(`/app/organizations/${id}/project/new`)}>Add project</SuccessButton>
  </Card>
  )
}

export default inject(`store`)(observer(Organization))
