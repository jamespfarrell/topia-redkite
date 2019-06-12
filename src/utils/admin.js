import axios from 'axios'
import * as routing from './routing'

const put = async (route, token, params = {}) =>
  await axios.put(route, params, {
    headers: {
      'Authorization': token
    }
  })

const get = async (route, token, params = {}) =>
  await axios.get(route, {
    headers: {
      'Authorization': token
    }
  })

export const getAllUsers = async (token) => {
  const result = await get(routing.adminUsersUrl, token)
  return result
}

export const getAllEmails = async (token) => {
  const result = await get(routing.adminNewsletterEmailsUrl, token)
  return result
}

export const getAllOrganizations = async (token) => {
  const result = await get(routing.adminOrganizationsUrl, token)
  return result
}

export const activateUser = async (token, id) => {
  const result = await put(routing.adminActivateUserUrl(id), token)
  return result
}

export const deactivateUser = async (token, id) => {
  const result = await put(routing.adminDectivateUserUrl(id), token)
  return result
}


