import accountsReducer from "../../../store/reducers/accountsReducer"
import { ACCOUNT_DEFAULT, ACCOUNTS_DEFAULT, SET_ACCOUNTS, SET_ACCOUNT } from "../../../store/reducers/types"
import { accountDefault, accountsDefault, getAccounts, getAccount } from "../../../store/actions/accountActions"
import * as Notifications from "../../../components/includes/Notifications"

describe('<accountActions />', () => {

    var store = mockStore(accountsReducer(undefined, {}))

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
        store = mockStore(accountsReducer(undefined, {}))
        jest.restoreAllMocks();
    })

    describe('<accountDefault />', () => {
        it('should return with type ACCOUNT_DEFAULT', () => {

            var action = accountDefault()

            expect(action).toEqual({
                type: ACCOUNT_DEFAULT
            })
        })
    })

    describe('<accountsDefault />', () => {
        it('should return with type ACCOUNTS_DEFAULT', () => {

            var action = accountsDefault()

            expect(action).toEqual({
                type: ACCOUNTS_DEFAULT
            })
        })
    })


    describe('<getAccounts />', () => {

        var accounts = [
            {
                type: fakerStatic.lorem.word(),
                balance: 30000,
            },
            {
                type: fakerStatic.lorem.word(),
                balance: 30000,
            }
        ]

        it('should return with accounts when received 200', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        accounts
                    }
                })
            })

            return store.dispatch(getAccounts()).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_ACCOUNTS])

                expect(newActions).toEqual([{
                    type: SET_ACCOUNTS,
                    accounts
                }])
            })
        })

        it('should return default if status is not success', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        accounts
                    }
                })
            })

            return store.dispatch(getAccounts()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([ACCOUNTS_DEFAULT])

                expect(newActions).toEqual([{
                    type: ACCOUNTS_DEFAULT
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

            return store.dispatch(getAccounts()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([ACCOUNTS_DEFAULT])

                expect(newActions).toEqual([{
                    type: ACCOUNTS_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })


    })

    describe('<getAccount />', () => {

        var account = {
            type: fakerStatic.lorem.word(),
            balance: 30000,
        }

        it('should return with account when received 200', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        account
                    }
                })
            })

            return store.dispatch(getAccount('222')).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_ACCOUNT])

                expect(newActions).toEqual([{
                    type: SET_ACCOUNT,
                    account
                }])
            })
        })

        it('should return default if status is not success', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        account
                    }
                })
            })

            return store.dispatch(getAccount('222')).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([ACCOUNT_DEFAULT])

                expect(newActions).toEqual([{
                    type: ACCOUNT_DEFAULT
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

            return store.dispatch(getAccount('222')).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([ACCOUNT_DEFAULT])

                expect(newActions).toEqual([{
                    type: ACCOUNT_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })


    })
})
