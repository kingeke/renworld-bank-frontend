import * as Notifications from "../../../components/includes/Notifications"
import { getTransaction, getTransactions, transactionDefault, transactionsDefault } from "../../../store/actions/transactionActions"
import transactionsReducer from "../../../store/reducers/transactionsReducer"
import { SET_TRANSACTION, SET_TRANSACTIONS, TRANSACTIONS_DEFAULT, TRANSACTION_DEFAULT } from "../../../store/reducers/types"

describe('<transactionActions />', () => {

    var store = mockStore(transactionsReducer(undefined, {}))

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
        store = mockStore(transactionsReducer(undefined, {}))
        jest.restoreAllMocks();
    })

    describe('<transactionsDefault />', () => {
        it('should return with type TRANSACTIONS_DEFAULT', () => {

            var action = transactionsDefault()

            expect(action).toEqual({
                type: TRANSACTIONS_DEFAULT
            })
        })
    })

    describe('<transactionDefault />', () => {
        it('should return with type TRANSACTION_DEFAULT', () => {

            var action = transactionDefault()

            expect(action).toEqual({
                type: TRANSACTION_DEFAULT
            })
        })
    })


    describe('<getTransactions />', () => {

        var transactions = [
            {
                type: fakerStatic.lorem.word(),
                balance: 30000,
            },
            {
                type: fakerStatic.lorem.word(),
                balance: 30000,
            }
        ]

        it('should return with transactions when received 200', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        transactions
                    }
                })
            })

            return store.dispatch(getTransactions()).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_TRANSACTIONS])

                expect(newActions).toEqual([{
                    type: SET_TRANSACTIONS,
                    transactions
                }])
            })
        })

        it('should return default if status is not success', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        transactions
                    }
                })
            })

            return store.dispatch(getTransactions()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([TRANSACTIONS_DEFAULT])

                expect(newActions).toEqual([{
                    type: TRANSACTIONS_DEFAULT
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

            return store.dispatch(getTransactions()).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([TRANSACTIONS_DEFAULT])

                expect(newActions).toEqual([{
                    type: TRANSACTIONS_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })
    })

    describe('<getTransaction />', () => {

        var transaction = {
            type: fakerStatic.lorem.word(),
            balance: 30000,
        }

        it('should return with transaction when received a transaction', () => {

            store.dispatch(getTransaction(transaction))
            var newActions = store.getActions()
            var dispatchTypes = newActions.map((a => a.type))

            expect(dispatchTypes).toEqual([SET_TRANSACTION])

            expect(newActions).toEqual([{
                type: SET_TRANSACTION,
                transaction
            }])
        })

        it('should return with transaction when received 200', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        status: 'success',
                        transaction
                    }
                })
            })

            return store.dispatch(getTransaction(null, '222')).then(() => {
                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([SET_TRANSACTION])

                expect(newActions).toEqual([{
                    type: SET_TRANSACTION,
                    transaction
                }])
            })
        })

        it('should return default if status is not success', () => {

            moxios.wait(() => {
                moxios.requests.mostRecent().respondWith({
                    status: 200,
                    response: {
                        transaction
                    }
                })
            })

            return store.dispatch(getTransaction(null, '222')).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([TRANSACTION_DEFAULT])

                expect(newActions).toEqual([{
                    type: TRANSACTION_DEFAULT
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

            return store.dispatch(getTransaction(null, '222')).then(() => {

                var newActions = store.getActions()

                var dispatchTypes = newActions.map((a => a.type))

                expect(dispatchTypes).toEqual([TRANSACTION_DEFAULT])

                expect(newActions).toEqual([{
                    type: TRANSACTION_DEFAULT
                }])

                expect(notificationFn).toBeCalled()
                expect(notificationFn).toBeCalledTimes(1)
                expect(notificationFn).toBeCalledWith(message, 'danger')
            })
        })


    })
})
