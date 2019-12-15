import { CustomButton, CustomSelect } from "../../../../components/layouts/CustomInputs"
import { Filters } from "../../../../components/layouts/Filters"

describe('<Filter />', () => {

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
        }
    }

    var filterOptions = ['account_number', 'type']

    var mockState = {
        filterLoading: false,
        filters: {
            type: '',
            account_number: ''
        }
    }

    it('should render the filter component correctly with the options', () => {

        const component = shallow(
            <Filters
                filterOptions={filterOptions}
                state={mockState}
                user={props.user}
            />
        )

        expect(component.find(CustomSelect).exists()).toBeTruthy()
        expect(component.find(CustomSelect)).toHaveLength(2)

    })

    it('should update state when user changes an input', () => {

        var handleFilterChange = (e) => {
            mockState.filters[e.target.name] = e.target.value
        }

        const component = shallow(
            <Filters
                handleFilterChange={handleFilterChange}
                filterOptions={filterOptions}
                state={mockState}
                user={props.user}
            />
        )

        component.find(CustomSelect).first().simulate('change', { target: { name: 'account_number', value: 'account number changed' } })

        component.find(CustomSelect).last().simulate('change', { target: { name: 'type', value: 'type changed' } })

        expect(mockState.filters.account_number).toEqual('account number changed')
        expect(mockState.filters.type).toEqual('type changed')

    })

    it('should call handleFilter function when button is clicked', () => {

        var handleFilter = jest.fn()

        const component = shallow(
            <Filters
                handleFilter={handleFilter}
                filterOptions={filterOptions}
                state={mockState}
                user={props.user}
            />
        )

        component.find(CustomButton).find({ title: 'Search' }).simulate('click', { preventDefault: () => null })

        expect(handleFilter).toBeCalled()
        expect(handleFilter).toBeCalledTimes(1)
    })

    it('should call resetFilters function when button is clicked', () => {

        var resetFilters = jest.fn()

        const component = shallow(
            <Filters
                resetFilters={resetFilters}
                filterOptions={filterOptions}
                state={mockState}
                user={props.user}
            />
        )

        component.find(CustomButton).find({ title: 'Reset' }).simulate('click', { preventDefault: () => null })

        expect(resetFilters).toBeCalled()
        expect(resetFilters).toBeCalledTimes(1)
    })
})
