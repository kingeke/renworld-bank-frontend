import dashboardReducer from "../../../store/reducers/dashboardReducer"
import { SET_DASHBOARD, DASHBOARD_DEFAULT } from "../../../store/reducers/types"


describe('<dashboardReducer />', () => {
    it('should return the default state', () => {
        var state = dashboardReducer(undefined, {})

        expect(state).toEqual({
            loaded: false,
            transactions: false,
            accounts: false,
            balance: false,
            recent_transactions: false
        })
    })

    it('should return the dashboard variables if received SET_DASHBOARD', () => {

        var actions = {
            transactions: ['1'],
            accounts: ['1'],
            balance: ['1'],
            recent_transactions: ['1']
        }

        var state = dashboardReducer(undefined, {
            type: SET_DASHBOARD,
            ...actions
        })

        expect(state).toEqual({
            loaded: true,
            ...actions
        })
    })

    it('should return the default state if received DASHBOARD_DEFAULT', () => {

        var state = dashboardReducer(undefined, {
            type: DASHBOARD_DEFAULT
        })

        expect(state).toEqual({
            loaded: false,
            transactions: false,
            accounts: false,
            balance: false,
            recent_transactions: false
        })
    })
})
