import axios from 'axios'
const isBrowser = typeof window !== `undefined`

export const handleLogin = async ({ email, password }) => {
  if (!isBrowser) return {}

  const url = 'http://localhost:3000/user/login'
  const params = {
    email, password
  }

  try {
    const response = await axios.post(url, params)
    return response
  } catch (e) {
    return {}
  }
}
