import websiteReducer from "../../../store/reducers/websiteReducer"
import { SET_WEBSITE, WEBSITE_DEFAULT } from "../../../store/reducers/types"

describe('<websiteReducer />', () => {
    it('should return the default state', () => {
        var state = websiteReducer(undefined, {})

        expect(state).toEqual({
            websiteLoading: true,
            banks: false,
            account_types: false,
        })
    })

    it('should return the website variables if received SET_WEBSITE', () => {

        var actions = {
            banks: ['bank'],
            account_types: ['account_types']
        }

        var state = websiteReducer(undefined, {
            type: SET_WEBSITE,
            ...actions
        })

        expect(state).toEqual({
            websiteLoading: false,
            ...actions
        })
    })

    it('should return the default state if received AUTH_DEFAULT', () => {

        var state = websiteReducer(undefined, {
            type: WEBSITE_DEFAULT
        })

        expect(state).toEqual({
            websiteLoading: true,
            banks: false,
            account_types: false,
        })
    })
})
