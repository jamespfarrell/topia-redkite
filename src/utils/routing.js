import axios from 'axios'

const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000'

export const get = async (route, token, params = {}) =>
  await axios.get(route, {
    headers: {
      'Authorization': token
    }
  })

export const newsletterUrl = `${API_URL}/newsletter`
export const userLoginUrl = `${API_URL}/user/login`
export const ngoUrl = `${API_URL}/ngo`
export const setPasswordUrl = `${API_URL}/user/password`
export const adminUsersUrl = `${API_URL}/admin/users`
export const adminActivateUserUrl = (userId) =>
  `${API_URL}/admin/user/${userId}/activate`
export const adminDectivateUserUrl = (userId) =>
  `${API_URL}/admin/user/${userId}/deactivate`
export const adminNewsletterEmailsUrl = `${API_URL}/admin/newsletter_emails`
export const adminOrganizationsUrl = `${API_URL}/organisations`
export const userUrl = `${API_URL}/user`
export const userImageApiUrl = filename => `${API_URL}/uploads/users/${filename}`
export const userOrganizations = `${API_URL}/user/organizations`
export const userProjects = `${API_URL}/user/projects`
export const organizationUrl = id => `${API_URL}/organisations/${id}`
export const organizationProjectUrl = id => `${API_URL}/organisations/${id}/projects`
export const sdgTargetsUrl = `${API_URL}/sdg_targets`
export const oauthFacebookUrl = `${API_URL}/oauth/facebook`
export const projectUrl = (id) => `${API_URL}/projects/${id}`
export const transactionsUrl = `${API_URL}/transactions`
export const projectBannerApiUrl = filename => `${API_URL}/uploads/projects/${filename}`
