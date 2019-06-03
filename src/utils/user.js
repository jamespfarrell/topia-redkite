import axios from 'axios'
import { setPasswordUrl } from './routing'
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
