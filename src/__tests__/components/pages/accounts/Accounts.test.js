import MainLayout from "../../../../components/layouts/MainLayout"
import { Accounts } from "../../../../components/pages/accounts/Accounts"
import { Card } from "react-bootstrap"
import TableLayout from "../../../../components/layouts/TableLayout"
import AccountsTableComponent from "../../../../components/layouts/AccountsTableComponent"
import { Pagination } from "../../../../components/layouts/CustomLayouts"

describe('<Accounts />', () => {

    var props = {
        getAccounts: jest.fn(),
        accounts: {
            total: 1,
            data: [{
                account_number: fakerStatic.lorem.word(),
                account_type: 'Savings',
                active: true,
                balance: 30000,
                created_at: '2019-03-03 22:22:22',
                transactions_count: 2
            }]
        }
    }

    it('should render the component correctly', () => {

        const component = shallow(
            <Accounts
                {...props}
            />
        )

        expect(component.find(MainLayout).find({ pageTitle: 'Accounts' }).exists()).toBeTruthy()
        expect(props.getAccounts).toBeCalled()
        expect(props.getAccounts).toBeCalledTimes(1)
        expect(component.find(Card).exists()).toBeTruthy()
        expect(component.find(TableLayout).exists()).toBeTruthy()
        expect(component.find(AccountsTableComponent).exists()).toBeTruthy()
        expect(component.find(Pagination).exists()).toBeTruthy()
    })

    it('should call handleStatus when the button is clicked', () => {

        var accountStatus = jest.fn()

        const component = shallow(
            <Accounts
                {...props}
                accountStatus={accountStatus}
            />
        )

        jest.spyOn(window, 'confirm').mockReturnValue(true)

        var account_number = props.accounts.data[0].account_number

        component.find(AccountsTableComponent).prop('handleStatus')(account_number)

        expect(component.state('pageLoading')).toBeTruthy()
        expect(accountStatus).toBeCalled()
        expect(accountStatus).toBeCalledWith(account_number)
        expect(accountStatus).toBeCalledTimes(1)
    })

    it('should call handlePageClick when the button is clicked', () => {

        var getAccounts = jest.fn()

        const component = shallow(
            <Accounts
                {...props}
                getAccounts={getAccounts}
            />
        )

        jest.clearAllMocks()

        component.find(Pagination).prop('handlePageClick')({ selected: 1 })
        expect(component.state('pageLoading')).toBeTruthy()
        expect(component.state('page')).toEqual(2)
        expect(getAccounts).toBeCalled()
        expect(getAccounts).toBeCalledTimes(1)
    })
})
