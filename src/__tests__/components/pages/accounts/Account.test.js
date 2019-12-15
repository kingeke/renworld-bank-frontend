import { Account } from "../../../../components/pages/accounts/Account"
import AccountLayout from "../../../../components/pages/accounts/components/AccountLayout"
import TransactionsTable from "../../../../components/pages/accounts/components/TransactionsTable"
import MainLayout from "../../../../components/layouts/MainLayout"

describe('<Account />', () => {

    var account_number = fakerStatic.lorem.word()

    var props = {
        getAccount: jest.fn(),
        match: {
            params: {
                account_number
            }
        },
        account: {
            account_number,
            account_type: 'Savings',
            active: true,
            balance: 30000,
            created_at: '2019-03-03 22:22:22',
            transactions: [{
                transaction_ref: fakerStatic.lorem.word(),
                type: 'Credit',
                previous_balance: 0,
                amount: 30000,
                current_balance: 30000,
                narration: null,
                created_at: '2019-03-03 22:22:22',
            }]
        }
    }

    it('should render the component correctly', () => {

        const component = shallow(
            <Account
                {...props}
            />
        )

        expect(component.find(MainLayout).find({ pageTitle: `Account: ${account_number}` }).exists()).toBeTruthy()
        expect(props.getAccount).toBeCalled()
        expect(props.getAccount).toBeCalledWith(props.match.params.account_number)
        expect(props.getAccount).toBeCalledTimes(1)
        expect(component.find(AccountLayout).exists()).toBeTruthy()
        expect(component.find(TransactionsTable).exists()).toBeTruthy()
    })

    it('should call handleStatus when the button is clicked', () => {

        var accountStatus = jest.fn()

        const component = shallow(
            <Account
                {...props}
                accountStatus={accountStatus}
            />
        )

        jest.spyOn(window, 'confirm').mockReturnValue(true)

        component.find(AccountLayout).prop('handleStatus')()

        expect(component.state('formSending')).toBeTruthy()
        expect(accountStatus).toBeCalled()
        expect(accountStatus).toBeCalledWith(account_number)
        expect(accountStatus).toBeCalledTimes(1)
    })

    it('should call getTransaction when the button is clicked', () => {

        var getTransaction = jest.fn()

        const component = shallow(
            <Account
                {...props}
                getTransaction={getTransaction}
            />
        )

        component.find(TransactionsTable).prop('handleView')()

        expect(getTransaction).toBeCalled()
        expect(getTransaction).toBeCalledTimes(1)
    })

    it('should call handlePageClick when the button is clicked', () => {

        var getAccount = jest.fn()

        const component = shallow(
            <Account
                {...props}
                getAccount={getAccount}
            />
        )

        jest.clearAllMocks()

        component.find(TransactionsTable).prop('handlePageClick')({ selected: 1 })
        expect(component.state('pageLoading')).toBeTruthy()
        expect(component.state('page')).toEqual(2)
        expect(getAccount).toBeCalled()
        expect(getAccount).toBeCalledTimes(1)
    })
})
