import axios from 'axios'
import { userLoginUrl, ngoUrl } from './routing'
const isBrowser = typeof window !== `undefined`

export const handleLogin = async ({ email, password }) => {
  if (!isBrowser) return {}

  const params = { email, password }

  try {
    const response = await axios.post(userLoginUrl, params)
    return response
  } catch (e) {
    return {}
  }
}

export const onboardNGO = async ({ email, name, orgName }) => {
  if (!isBrowser) return {}

  const params = { email, name, orgName }

  try {
    const response = await axios.post(ngoUrl, params)
    return response
  } catch (e) {
    return e.response.data
  }
}
