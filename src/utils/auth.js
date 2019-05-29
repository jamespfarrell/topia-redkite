import axios from 'axios'
import { userLoginUrl } from './routing'
const isBrowser = typeof window !== `undefined`

export const handleLogin = async ({ email, password }) => {
  if (!isBrowser) return {}

  const params = {
    email, password
  }

  try {
    const response = await axios.post(userLoginUrl, params)
    return response
  } catch (e) {
    return {}
  }
}
