import axios from 'axios'
import { organizationUrl } from './routing'
const isBrowser = typeof window !== `undefined`

export const getOrganization = async (id) => {
  try {
    const response = await axios.get(organizationUrl(id))
    return response.data
  } catch (e) {
    return e.response.data
  }
}


export const updateOrganization = async ({ token, id, name, logoFile, bannerFile }) => {
  if (!isBrowser) return {}

  let formData = new FormData()
  if(logoFile) {
    formData.append('logoFile', logoFile)
  }
  if(bannerFile) {
    formData.append('bannerFile', bannerFile)
  }
  formData.append('name', name)

  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    }
  }

  try {
    const response = await axios.put(organizationUrl(id), formData, config)
    return response
  } catch (e) {
    return e.response.data
  }
}
