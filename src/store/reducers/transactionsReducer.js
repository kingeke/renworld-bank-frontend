import { SET_TRANSACTIONS, TRANSACTIONS_DEFAULT, TRANSACTION_DEFAULT, SET_TRANSACTION } from "./types"

const initialState = {
    transaction: false,
    transactions: false
}

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRANSACTIONS_DEFAULT:
            return transactionsDefault(state)
        case TRANSACTION_DEFAULT:
            return transactionDefault(state)
        case SET_TRANSACTIONS:
            return setTransactions(state, action)
        case SET_TRANSACTION:
            return setTransaction(state, action)
        default:
            return state
    }
}

const setTransactions = (state, action) => {
    return {
        ...state,
        transactions: action.transactions
    }
}

const setTransaction = (state, action) => {
    return {
        ...state,
        transaction: action.transaction
    }
}

const transactionsDefault = (state) => {
    return {
        ...state,
        transactions: false
    }
}

const transactionDefault = (state) => {
    return {
        ...state,
        transaction: false
    }
}

export default transactionsReducer