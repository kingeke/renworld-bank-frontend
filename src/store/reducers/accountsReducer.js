import { ACCOUNTS_DEFAULT, ACCOUNT_DEFAULT, SET_ACCOUNT, SET_ACCOUNTS } from "./types"

const initialState = {
    account: false,
    accounts: false
}

const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNTS_DEFAULT:
            return accountsDefault(state)
        case ACCOUNT_DEFAULT:
            return accountDefault(state)
        case SET_ACCOUNTS:
            return setAccounts(state, action)
        case SET_ACCOUNT:
            return setAccount(state, action)
        default:
            return state
    }
}

const setAccounts = (state, action) => {
    return {
        ...state,
        accounts: action.accounts
    }
}

const setAccount = (state, action) => {
    return {
        ...state,
        account: action.account
    }
}

const accountsDefault = (state) => {
    return {
        ...state,
        accounts: false
    }
}

const accountDefault = (state) => {
    return {
        ...state,
        account: false
    }
}

export default accountsReducer