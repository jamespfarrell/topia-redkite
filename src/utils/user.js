import axios from 'axios'
import { get, userOrganizations, setPasswordUrl, userUrl } from './routing'
const isBrowser = typeof window !== `undefined`


export const setPassword = async ({ token, password }) => {
  if (!isBrowser) return {}

  const params = { token, password }

  try {
    const response = await axios.put(setPasswordUrl, params)
    return response
  } catch (e) {
    return e.response.data
  }
}

export const updateProfile = async ({ token, name, email, avatarFile, bannerFile }) => {
  if (!isBrowser) return {}
  try {
    let formData = new FormData()
    if(avatarFile) {
      formData.append('avatarFile', avatarFile)
    }
    if(bannerFile) {
      formData.append('bannerFile', bannerFile)
    }
    formData.append('name', name)
    formData.append('email', email)

    const headers = {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    }

    const { data } = await axios.put(userUrl, formData, { headers })
    return data
  } catch (e) {
    return e.response.data
  }
}

export const getProfile = async ({ token }) => {
  if (!isBrowser) return {}

  const params = { token }

  try {
    const response = await axios.get(userUrl, params)
    return response
  } catch (e) {
    return e.response.data
  }
}

export const getOrganizations = async ({ token }) => {
  const result = await get(userOrganizations, token)
  return result
}
