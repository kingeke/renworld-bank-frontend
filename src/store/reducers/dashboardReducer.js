import { DASHBOARD_DEFAULT, SET_DASHBOARD } from "./types"

const initialState = {
    loaded: false,
    transactions: false,
    accounts: false,
    balance: false,
    recent_transactions: false
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD_DEFAULT:
            return dashboardDefault(state)
        case SET_DASHBOARD:
            return setDashboard(state, action)
        default:
            return state
    }
}

const setDashboard = (state, action) => {
    return {
        ...state,
        loaded: true,
        transactions: action.transactions,
        accounts: action.accounts,
        balance: action.balance,
        recent_transactions: action.recent_transactions
    }
}

const dashboardDefault = (state) => {
    return {
        ...state,
        loaded: false,
        transactions: false,
        accounts: false,
        balance: false,
        recent_transactions: false
    }
}

export default dashboardReducer