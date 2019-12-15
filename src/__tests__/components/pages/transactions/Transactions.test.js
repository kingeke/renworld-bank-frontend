import { Pagination } from "../../../../components/layouts/CustomLayouts"
import Filters from "../../../../components/layouts/Filters"
import MainLayout from "../../../../components/layouts/MainLayout"
import TransactionTableComponent from "../../../../components/layouts/TransactionTableComponent"
import { Transactions } from "../../../../components/pages/transactions/Transactions"

describe('<Transactions />', () => {

    var filters = {
        type: '',
        account_number: ''
    }

    var props = {
        transactions: {
            total: 1,
            data: [
                {
                    transaction_ref: fakerStatic.lorem.word()
                }
            ]
        },
        getTransactions: jest.fn(),
        user: {
            accounts: [
                {
                    account_number: fakerStatic.lorem.word()
                }
            ]
        },
        getTransaction: jest.fn()
    }

    it('should render the component correctly', () => {
        const component = shallow(
            <Transactions
                {...props}
            />
        )

        expect(props.getTransactions).toBeCalled()
        expect(props.getTransactions).toBeCalledTimes(1)
        expect(component.find(MainLayout).find({ pageTitle: 'Transactions' }).exists()).toBeTruthy()
        expect(component.find(Filters).exists()).toBeTruthy()
        expect(component.find(TransactionTableComponent).exists()).toBeTruthy()
        expect(component.find(Pagination).exists()).toBeTruthy()
    })

    it('should call resetFilters on button click', () => {
        const component = shallow(
            <Transactions
                {...props}
            />
        )

        jest.clearAllMocks()

        component.find(Filters).prop('resetFilters')()

        expect(props.getTransactions).toBeCalled()
        expect(props.getTransactions).toBeCalledTimes(1)
        expect(component.state('filterLoading')).toBeTruthy()
        expect(component.state('pageLoading')).toBeTruthy()
        expect(component.state('filters')).toEqual(filters)
    })

    it('should call handleFilter on button click', () => {
        const component = shallow(
            <Transactions
                {...props}
            />
        )

        jest.clearAllMocks()

        component.find(Filters).prop('handleFilter')()

        expect(props.getTransactions).toBeCalled()
        expect(props.getTransactions).toBeCalledTimes(1)
        expect(component.state('filterLoading')).toBeTruthy()
        expect(component.state('pageLoading')).toBeTruthy()
    })

    it('should call handlePageClick on button click', () => {
        const component = shallow(
            <Transactions
                {...props}
            />
        )

        jest.clearAllMocks()

        component.find(Pagination).prop('handlePageClick')({ selected: 1 })

        expect(props.getTransactions).toBeCalled()
        expect(props.getTransactions).toBeCalledTimes(1)
        expect(component.state('pageLoading')).toBeTruthy()
        expect(component.state('page')).toEqual(2)
    })

    it('should call handleView on button click', () => {
        const component = shallow(
            <Transactions
                {...props}
            />
        )

        jest.clearAllMocks()

        component.find(TransactionTableComponent).prop('handleView')()

        expect(props.getTransaction).toBeCalled()
        expect(props.getTransaction).toBeCalledTimes(1)
    })
})
