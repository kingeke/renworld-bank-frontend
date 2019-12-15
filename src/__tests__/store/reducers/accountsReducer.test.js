import accountsReducer from "../../../store/reducers/accountsReducer"
import { SET_ACCOUNTS, ACCOUNTS_DEFAULT, SET_ACCOUNT, ACCOUNT_DEFAULT } from "../../../store/reducers/types"

describe('<accountsReducer />', () => {
    it('should return the default state', () => {
        var state = accountsReducer(undefined, {})

        expect(state).toEqual({
            account: false,
            accounts: false
        })
    })

    describe('<accounts />', () => {
        it('should return the accounts if received SET_ACCOUNTS', () => {

            var actions = {
                accounts: ['1', '2']
            }

            var state = accountsReducer(undefined, {
                type: SET_ACCOUNTS,
                ...actions
            })

            expect(state).toEqual({
                ...actions,
                account: false
            })
        })

        it('should return the default accounts if received ACCOUNTS_DEFAULT', () => {

            var state = accountsReducer(undefined, {
                type: ACCOUNTS_DEFAULT
            })

            expect(state).toEqual({
                account: false,
                accounts: false
            })
        })
    })

    describe('<account />', () => {
        it('should return the account if received SET_ACCOUNT', () => {

            var actions = {
                account: ['1', '2']
            }

            var state = accountsReducer(undefined, {
                type: SET_ACCOUNT,
                ...actions
            })

            expect(state).toEqual({
                ...actions,
                accounts: false
            })
        })

        it('should return the default account if received ACCOUNT_DEFAULT', () => {

            var state = accountsReducer(undefined, {
                type: ACCOUNT_DEFAULT
            })

            expect(state).toEqual({
                account: false,
                accounts: false
            })
        })
    })

})
