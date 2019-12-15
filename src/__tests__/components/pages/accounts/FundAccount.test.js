import { FundAccount } from "../../../../components/pages/accounts/FundAccount"
import { FormLayout, FromAccount, Amount } from "../../../../components/layouts/Forms"
import { Form } from "react-bootstrap"
import MainLayout from "../../../../components/layouts/MainLayout"
import { CustomButton } from "../../../../components/layouts/CustomInputs"

describe('<FundAccount />', () => {

    var mockState = {
        account: fakerStatic.lorem.word(),
        amount: 30000,
    }

    var props = {
        user: {
            accounts: [
                {
                    account_number: fakerStatic.lorem.word()
                }
            ]
        }
    }

    it('should render the component correctly', () => {
        const component = shallow(
            <FundAccount
                {...props}
            />
        )

        expect(component.find(MainLayout).find({ pageTitle: 'Fund Account' }).exists()).toBeTruthy()
        expect(component.find(FormLayout).exists()).toBeTruthy()
        expect(component.find(Form).exists()).toBeTruthy()
        expect(component.find(FromAccount).exists()).toBeTruthy()
        expect(component.find(Amount).exists()).toBeTruthy()
        expect(component.find(CustomButton).exists()).toBeTruthy()
    })

    it('should update state when an input changes', () => {
        const component = shallow(
            <FundAccount
                {...props}
            />
        )

        var account = component.find(FromAccount)
        var amount = component.find(Amount)

        simulateChange(account, mockState.account, 'account')
        simulateChange(amount, mockState.amount, 'amount')

        expect(component.state().account).toEqual(mockState.account)
        expect(component.state().amount).toEqual(mockState.amount)
    })

    it('should call handleSubmit function when the button is clicked', () => {

        var fund = jest.fn()

        const component = shallow(
            <FundAccount
                {...props}
                fund={fund}
            />
        )

        const handleSubmit = mockInstance(component, 'handleSubmit')

        var fundBtn = component.find(CustomButton).find({ title: 'Fund' })

        fundBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
        expect(fund).toBeCalled()
        expect(fund).toBeCalledTimes(1)
        expect(component.state().formSending).toBeTruthy()
    })
})
