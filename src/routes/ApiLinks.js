const server = window.location.origin === 'http://localhost:3000' ? 'live' : 'live'
export const endpoint = server === 'local' ? 'http://127.0.0.1:8000' : 'https://api-renworld-bank.herokuapp.com'
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