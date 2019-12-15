import { CreateAccount } from "../../../../components/pages/accounts/CreateAccount"
import MainLayout from "../../../../components/layouts/MainLayout"
import { FormLayout, AccountType, Balance } from "../../../../components/layouts/Forms"
import { Form } from "react-bootstrap"
import { CustomButton } from "../../../../components/layouts/CustomInputs"

describe('<CreateAccount />', () => {

    var mockState = {
        account_type: 'Savings',
        balance: 30000,
    }

    it('should render the component correctly', () => {
        const component = shallow(
            <CreateAccount
            />
        )

        expect(component.find(MainLayout).find({ pageTitle: 'Create Account' }).exists()).toBeTruthy()
        expect(component.find(FormLayout).exists()).toBeTruthy()
        expect(component.find(Form).exists()).toBeTruthy()
        expect(component.find(AccountType).exists()).toBeTruthy()
        expect(component.find(Balance).exists()).toBeTruthy()
        expect(component.find(CustomButton).exists()).toBeTruthy()
    })

    it('should update state when an input changes', () => {
        const component = shallow(
            <CreateAccount
            />
        )

        var account_type = component.find(AccountType)
        var balance = component.find(Balance)

        simulateChange(account_type, mockState.account_type, 'account_type')
        simulateChange(balance, mockState.balance, 'balance')

        expect(component.state().account_type).toEqual(mockState.account_type)
        expect(component.state().balance).toEqual(mockState.balance)
    })

    it('should call handleSubmit function when the button is clicked', () => {

        var create = jest.fn()

        const component = shallow(
            <CreateAccount
                create={create}
            />
        )

        const handleSubmit = mockInstance(component, 'handleSubmit')

        var createBtn = component.find(CustomButton).find({ title: 'Create' })

        createBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
        expect(create).toBeCalled()
        expect(create).toBeCalledTimes(1)
        expect(component.state().formSending).toBeTruthy()
    })

})
