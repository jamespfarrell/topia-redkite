import axios from 'axios'
import * as routing from './routing'

export const getAllUsers = async (token) => {
  const result = await axios.get(routing.adminUsersUrl, {
    headers: {
      'Authorization': token
    }
  })

  return result
}

export const activateUser = async (token, id) => {
  const result = await axios.put(routing.adminActivateUserUrl(id), {}, {
    headers: {
      'Authorization': token
    }
  })

  return result
}
