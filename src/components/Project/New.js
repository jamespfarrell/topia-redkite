import React, { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import SEO from '../SEO'
import UserLayout from '../UserLayout'
import { Line, SubmitButton, InputWithLabel, UploadInput, LongText } from '../Form'
import { Card, FormContainer, SaveBtnContainer, Preview } from '../Profile/Card'
import Map from './Map'
import MultiSelect from '@kenshooui/react-multi-select'
import '@kenshooui/react-multi-select/dist/style.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.min.css"
import "./New.scss"
import { sdgTargetsUrl } from '../../utils/routing'
import { createProject } from '../../utils/project'
import axios from 'axios'
import BannerSvg from '../../assets/svgs/banner-default.svg'
import { navigate } from 'gatsby'

const New = ({store, orgId}) => {
  const { token } = store.CurrentUser
  const axiosConfig = {
    headers: {
      'Authorization': token
    }
  }
  const [sdgTargets, setSdgTargets] = useState([])
  const [projectParams, setProjectParams] = useState({
    coordinates: [],
    sdgTargetIds: [],
    sattelite_url: '',
    startAt: new Date(),
    bannerUrl: null
  })

  useEffect(() => {
    const fetchSdgTargets = async () => {
      const response = await axios.get(sdgTargetsUrl, axiosConfig)

      setSdgTargets(response.data.map(tar =>
        ({
          id: tar.id,
          label: tar.title,
          group: `${tar.sdg.sdg_goal_no}. ${tar.sdg.short_title}` })
      ))
    }
    fetchSdgTargets()
  }, [])

  const setPolygon = (newVal) => {
    setProjectParams({...projectParams, coordinates: newVal })
  }

  const handleUpdate = (e) => {
    const { target } = e
    setProjectParams({...projectParams, [target.name]: target.value })
  }

  const handleDate = (startAt) => {
    setProjectParams({...projectParams, startAt })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await createProject({ token, orgId, ...projectParams })
    console.log(response)

    if (response.status === 200) {
      navigate('/app/profile#profile')
    }
  }

  const handleGoals = (items) => {
    setProjectParams({...projectParams, sdgTargetIds: items.map(item => item.id) })
  }

  const handleBannerFileUpload = e => {
    const file = e.target.files[0]

    setProjectParams({
      ...projectParams,
      [e.target.name]: file,
      bannerUrl: URL.createObjectURL(file)
    })
  }


  return (
    <UserLayout>
      <SEO title='Add new project' />
      <Card onSubmit={handleSubmit}>
        <div className='header'>
          <div>
            <h1>Add new project</h1>
            <p>Something smart should be written here as well.</p>
          </div>
          <SaveBtnContainer>
            <SubmitButton label='Save' />
          </SaveBtnContainer>
        </div>
        <Line />
        <FormContainer>
          <InputWithLabel handleUpdate={handleUpdate} label='Name' type='text' name='name' />
          <p><b>Start date</b></p>
          <DatePicker
            className='projectDatePicker'
            style={{width: '400px'}}
            selected={projectParams.startAt}
            onChange={(date) => handleDate(date)}
          />
          <InputWithLabel handleUpdate={handleUpdate} label='Sattelite map url' type='text' name='sattelite_url' />
          <p><b>Banner</b></p>
          <div className='row'>
            <div className='col' style={{marginRight: '24px'}}>
              {projectParams.bannerUrl ? <Preview url={projectParams.bannerUrl} /> : <BannerSvg />}
            </div>
            <div className='col'>
              <UploadInput handler={handleBannerFileUpload} name='bannerFile'>
                Upload banner
              </UploadInput>
            </div>
          </div>
          <p><b>Description</b></p>
          <LongText rows="7" onChange={handleUpdate} name='description'></LongText>
          <p><b>Goals</b></p>
          </FormContainer>
          <MultiSelect
            onChange={handleGoals}
            style={{width: '500px'}}
            withGrouping
            items={sdgTargets}
          />
        <FormContainer>
        <p><b>Location</b></p>
        <Map polygon={projectParams.coordinates} setPolygon={setPolygon} />
        </FormContainer>
      </Card>
    </UserLayout>
  )
}

export default inject(`store`)(New)
