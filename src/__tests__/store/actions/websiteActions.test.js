import * as Notifications from "../../../components/includes/Notifications"
import { getWebsite, websiteDefault } from "../../../store/actions/websiteActions"
import { SET_WEBSITE, WEBSITE_DEFAULT } from "../../../store/reducers/types"
import websiteReducer from "../../../store/reducers/websiteReducer"

describe('<websiteActions />', () => {

    var store = mockStore(websiteReducer(undefined, {}))

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
        store = mockStore(websiteReducer(undefined, {}))
        jest.restoreAllMocks();
    })

    describe('<websiteDefault />', () => {
        it('should return with type ACCOUNT_DEFAULT', () => {

            var action = websiteDefault()

            expect(action).toEqual({
                type: WEBSITE_DEFAULT
            })
        })
    })


    describe('<getWebsite />', () => {

        var data = {
            banks: ['1'],
            account_types: ['1']
        }

        it('should return with data when received 200', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        ...data
                    }
                })
            })

            return store.dispatch(getWebsite()).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_WEBSITE])

                expect(newActions).toEqual([{
                    type: SET_WEBSITE,
                    ...data
                }])
            })
        })

        it('should return default if status is not success', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        data
                    }
                })
            })

            return store.dispatch(getWebsite()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([WEBSITE_DEFAULT])

                expect(newActions).toEqual([{
                    type: WEBSITE_DEFAULT
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

            return store.dispatch(getWebsite()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([WEBSITE_DEFAULT])

                expect(newActions).toEqual([{
                    type: WEBSITE_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })
    })
})
