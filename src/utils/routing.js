const API_URL = process.env.API_URL

export const newsletterUrl = `${API_URL}/newsletter`
export const userLoginUrl = `${API_URL}/user/login`
export const ngoUrl = `${API_URL}/ngo`
export const setPasswordUrl = `${API_URL}/user/password`
export const adminUsersUrl = `${API_URL}/admin/users`
export const adminActivateUserUrl = (userId) =>
  `${API_URL}/admin/user/${userId}/activate`
export const adminDectivateUserUrl = (userId) =>
  `${API_URL}/admin/user/${userId}/deactivate`
