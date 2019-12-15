import { Transaction } from "../../../../components/pages/transactions/Transaction"
import MainLayout from "../../../../components/layouts/MainLayout"
import TransactionLayout from "../../../../components/pages/transactions/components/TransactionLayout"

describe('<Transaction />', () => {

    var props

    beforeEach(() => {
        props = {
            match: {
                params: {
                    transaction_ref: fakerStatic.lorem.word()
                }
            },
            transaction: false,
            getTransaction: jest.fn()
        }
    })

    it('should render the component correctly', () => {
        const component = shallow(
            <Transaction
                {...props}
            />
        )

        expect(props.getTransaction).toBeCalled()
        expect(props.getTransaction).toBeCalledWith(props.match.params.transaction_ref)
        expect(props.getTransaction).toBeCalledTimes(1)
        expect(component.find(MainLayout).exists()).toBeTruthy()
        expect(component.find(TransactionLayout).exists()).toBeTruthy()
        expect(component.state('loaded')).toBeFalsy()
    })

    it('should set loaded state to true if received a transaction', () => {

        props.transaction = {
            transaction_ref: props.match.params.transaction_ref
        }

        const component = shallow(
            <Transaction
                {...props}
            />
        )

        expect(component.state('loaded')).toBeTruthy()
    })
})
