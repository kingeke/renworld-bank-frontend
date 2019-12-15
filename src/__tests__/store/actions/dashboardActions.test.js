import * as Notifications from "../../../components/includes/Notifications"
import { dashboardDefault, getDashboard } from "../../../store/actions/dashboardActions"
import dashboardReducer from "../../../store/reducers/dashboardReducer"
import { DASHBOARD_DEFAULT, SET_DASHBOARD } from "../../../store/reducers/types"

describe('<dashboardActions />', () => {

    var store = mockStore(dashboardReducer(undefined, {}))

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
        store = mockStore(dashboardReducer(undefined, {}))
        jest.restoreAllMocks();
    })

    describe('<dashboardDefault />', () => {
        it('should return with type DASHBOARD_DEFAULT', () => {

            var action = dashboardDefault()

            expect(action).toEqual({
                type: DASHBOARD_DEFAULT
            })
        })
    })

    describe('<getDashboard />', () => {

        var data = {
            transactions: ['2'],
            accounts: ['2'],
            balance: ['2'],
            recent_transactions: ['2'],
        }

        it('should return with accounts when received 200', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        ...data
                    }
                })
            })

            return store.dispatch(getDashboard()).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_DASHBOARD])

                expect(newActions).toEqual([{
                    type: SET_DASHBOARD,
                    ...data
                }])
            })
        })

        it('should return default if status is not success', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        ...data
                    }
                })
            })

            return store.dispatch(getDashboard()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([DASHBOARD_DEFAULT])

                expect(newActions).toEqual([{
                    type: DASHBOARD_DEFAULT
                }])
            })
        })

        it('should return default if status code is not 200 and show user the error message notification', () => {

            var message = fakerStatic.lorem.paragraph()

            var notificationFn = jest.spyOn(Notifications, 'showNotification')

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 500,
                    response: {
                        message
                    }
                })
            })

            return store.dispatch(getDashboard()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([DASHBOARD_DEFAULT])

                expect(newActions).toEqual([{
                    type: DASHBOARD_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })
    })
})
