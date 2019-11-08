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
import { projectUrl, sdgTargetsUrl } from '../../utils/routing'
import axios from 'axios'
import Confirmation from '../UserLayout/Confirmation'
import BannerSvg from '../../assets/svgs/banner-default.svg'
import { updateProject } from '../../utils/project'

const Edit = ({store, projectId}) => {
  const { token } = store.CurrentUser
  const axiosConfig = {
    headers: {
      'Authorization': token
    }
  }
  const [ showConfirmation, setConfirmation] = useState(false)
  const [selectedSdgs, setSelectedSdgs] = useState([])
  const [sdgTargets, setSdgTargets] = useState([])
  const [projectParams, setProjectParams] = useState({
    name: '',
    description: '',
    sattelite_url: '',
    coordinates: [],
    sdgTargetIds: [],
    startAt: new Date(),
    bannerUrl: null,
    bannerFile: null
  })

  useEffect(() => {
    const fetchProject = async () => {
      const response = await axios.get(projectUrl(projectId), axiosConfig)

      setProjectParams({
        ...projectParams,
        sattelite_url: response.data.sattelite_url,
        description: response.data.description,
        bannerUrl: response.data.bannerUrl,
        name: response.data.name,
        coordinates: response.data.coordinates || [],
        startAt: new Date(response.data.startAt),
        sdgTargetIds: response.data.sdg_targets.map(tar => tar.id)
      })

      setSelectedSdgs(response.data.sdg_targets.map(tar =>
        ({
          id: tar.id,
          label: tar.title,
          group: `${tar.sdg.sdg_goal_no}. ${tar.sdg.short_title}` })
      ))
    }
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
    fetchProject()
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
    const response = await updateProject({ token, id: projectId, ...projectParams })
    console.log(response)
    if(response) {
      setConfirmation(true)
      setTimeout(() => setConfirmation(false), 3000)
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
      <Confirmation text='Project changed' show={showConfirmation} />
      <SEO title='Edit project' />
      <Card onSubmit={handleSubmit}>
        <div className='header'>
          <div>
            <h1>Edit project</h1>
            <p>Something smart should be written here as well.</p>
          </div>
          <SaveBtnContainer>
            <SubmitButton label='Save' />
          </SaveBtnContainer>
        </div>
        <Line />
        <FormContainer>
          <InputWithLabel
            value={projectParams.name}
            handleUpdate={handleUpdate}
            label='Name'
            type='text'
            name='name'
          />
          <p><b>Start date</b></p>
          <DatePicker
            className='projectDatePicker'
            style={{width: '400px'}}
            selected={projectParams.startAt}
            onChange={(date) => handleDate(date)}
          />
          <InputWithLabel
            value={projectParams.sattelite_url}
            handleUpdate={handleUpdate}
            label='Sattelite map url'
            type='text'
            name='sattelite_url'
          />
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
          <LongText rows="7" onChange={handleUpdate} name='description'>{projectParams.description}</LongText>
          <p><b>Goals</b></p>
          </FormContainer>
          <MultiSelect
            onChange={handleGoals}
            style={{width: '500px'}}
            withGrouping
            selectedItems={selectedSdgs}
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

export default inject(`store`)(Edit)
