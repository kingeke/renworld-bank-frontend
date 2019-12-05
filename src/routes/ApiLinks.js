const server = window.location.origin === 'https://tecky.com.ng' ? 'live' : 'local'
export const endpoint = server === 'local' ? 'http://127.0.0.1:8000' : 'https://www.api.tecky.com.ng'
export const api = `${endpoint}/api`

export const apiLinks = {
    website: `${api}/website`,
    login: `${api}/auth/login`,
    logOut: `${api}/auth/log-out`,
    register: `${api}/auth/sign-up`,
    fetchProfile: `${api}/profile`,
    changePassword: `${api}/profile/change-password`,
    updateProfile: `${api}/profile/update-profile`,
    dashboard: `${api}/dashboard`,
    accounts: `${api}/accounts`,
    account: `${api}/account`,
    transactions: `${api}/transactions`,
    transaction: `${api}/transaction`,
}