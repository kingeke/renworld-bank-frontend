import { SET_WEBSITE, WEBSITE_DEFAULT } from "./types"

const initialState = {
    websiteLoading: true,
    banks: false,
    account_types: false,
}

const websiteReducer = (state = initialState, action) => {
    switch (action.type) {
        case WEBSITE_DEFAULT:
            return websiteDefault(state)
        case SET_WEBSITE:
            return setWebsite(state, action)
        default:
            return state
    }
}

const setWebsite = (state, action) => {
    return {
        ...state,
        websiteLoading: false,
        banks: action.banks,
        account_types: action.account_types
    }
}

const websiteDefault = (state) => {
    return {
        ...state,
        websiteLoading: true,
        banks: false,
        account_types: false,
    }
}

export default websiteReducer