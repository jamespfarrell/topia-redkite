import axios from 'axios'
import { projectUrl, organizationProjectUrl } from './routing'
const isBrowser = typeof window !== `undefined`

export const updateProject = async ({ token, description, id, name, bannerFile, coordinates, startAt, sdgTargetIds }) => {
  if (!isBrowser) return {}

  let formData = new FormData()
  if(bannerFile) {
    formData.append('bannerFile', bannerFile)
  }
  formData.append('name', name)
  formData.append('description', description)
  formData.append('coordinates', JSON.stringify(coordinates))
  formData.append('startAt', startAt)
  formData.append('sdgTargetIds', JSON.stringify(sdgTargetIds))

  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    }
  }

  try {
    const response = await axios.put(projectUrl(id), formData, config)
    return response
  } catch (e) {
    return e.response.data
  }
}

export const createProject = async ({ token, sattelite_url, description, orgId, name, bannerFile, coordinates, startAt, sdgTargetIds }) => {
  if (!isBrowser) return {}

  let formData = new FormData()
  if(bannerFile) {
    formData.append('bannerFile', bannerFile)
  }
  formData.append('name', name)
  formData.append('coordinates', JSON.stringify(coordinates))
  formData.append('startAt', startAt)
  formData.append('description', description)
  formData.append('sdgTargetIds', JSON.stringify(sdgTargetIds))
  formData.append('sattelite_url', sattelite_url)

  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    }
  }

  try {
    const response = await axios.post(organizationProjectUrl(orgId), formData, config)
    return response
  } catch (e) {
    return e.response.data
  }
}
