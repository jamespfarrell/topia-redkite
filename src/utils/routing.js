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
export const adminNewsletterEmailsUrl = `${API_URL}/admin/newsletter_emails`
export const adminOrganizationsUrl = `${API_URL}/organisations`
export const userUrl = `${API_URL}/user`
export const avatarApiUrl = filename => `${API_URL}/uploads/users/${filename}`
