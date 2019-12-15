import transactionsReducer from "../../../store/reducers/transactionsReducer"
import { SET_TRANSACTIONS, TRANSACTIONS_DEFAULT, SET_TRANSACTION, TRANSACTION_DEFAULT } from "../../../store/reducers/types"

describe('<transactionsReducer />', () => {
    it('should return the default state', () => {
        var state = transactionsReducer(undefined, {})

        expect(state).toEqual({
            transaction: false,
            transactions: false
        })
    })

    describe('<transactions />', () => {
        it('should return the transactions if received SET_TRANSACTIONS', () => {

            var actions = {
                transactions: ['1', '2']
            }

            var state = transactionsReducer(undefined, {
                type: SET_TRANSACTIONS,
                ...actions
            })

            expect(state).toEqual({
                ...actions,
                transaction: false
            })
        })

        it('should return the default transactions if received TRANSACTIONS_DEFAULT', () => {

            var state = transactionsReducer(undefined, {
                type: TRANSACTIONS_DEFAULT
            })

            expect(state).toEqual({
                transaction: false,
                transactions: false
            })
        })
    })

    describe('<transaction />', () => {
        it('should return the transaction if received SET_TRANSACTION', () => {

            var actions = {
                transaction: ['1', '2']
            }

            var state = transactionsReducer(undefined, {
                type: SET_TRANSACTION,
                ...actions
            })

            expect(state).toEqual({
                ...actions,
                transactions: false
            })
        })

        it('should return the default transaction if received TRANSACTION_DEFAULT', () => {

            var state = transactionsReducer(undefined, {
                type: TRANSACTION_DEFAULT
            })

            expect(state).toEqual({
                transaction: false,
                transactions: false
            })
        })
    })

})
