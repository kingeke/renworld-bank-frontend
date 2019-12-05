import { combineReducers } from 'redux'
import accountsReducer from './accountsReducer'
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'
import formReducer from './formReducer'
import transactionsReducer from './transactionsReducer'
import websiteReducer from './websiteReducer'

const rootReducer = combineReducers({
    app: combineReducers({
        form: formReducer,
        website: websiteReducer
    }),
    users: combineReducers({
        auth: authReducer,
        dashboard: dashboardReducer,
        transactions: transactionsReducer,
        accounts: accountsReducer,
    }),
})

export default rootReducer