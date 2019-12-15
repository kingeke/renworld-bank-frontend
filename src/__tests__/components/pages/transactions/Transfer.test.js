import { Transfer } from "../../../../components/pages/transactions/Transfer"
import MainLayout from "../../../../components/layouts/MainLayout"
import { FormLayout, FromAccount, ToAccount, Amount, Password, Narration, BankName, AccountName, AccountNumber } from "../../../../components/layouts/Forms"
import { CustomButton } from "../../../../components/layouts/CustomInputs"

describe('<Transfer />', () => {

    var mockState = {
        from_account: fakerStatic.lorem.word(),
        to_account: 'others',
        amount: 30000,
        password: fakerStatic.lorem.word(),
        narration: fakerStatic.lorem.word(),
        bank_name: fakerStatic.lorem.word(),
        account_name: fakerStatic.lorem.word(),
        account_number: fakerStatic.lorem.word(),
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
            <Transfer
                {...props}
            />
        )

        expect(component.find(MainLayout).find({ pageTitle: 'Transfer Money' }).exists()).toBeTruthy()
        expect(component.find(FormLayout).exists()).toBeTruthy()
        expect(component.find(FromAccount).exists()).toBeTruthy()
        expect(component.find(ToAccount).exists()).toBeTruthy()
        expect(component.find(Amount).exists()).toBeTruthy()
        expect(component.find(Password).exists()).toBeTruthy()
        expect(component.find(Narration).exists()).toBeTruthy()
        expect(component.find(CustomButton).exists()).toBeTruthy()
    })

    it('should render other options if the to_account is others', () => {
        const component = shallow(
            <Transfer
                {...props}
            />
        )

        component.setState({ to_account: 'others' })
        expect(component.find(BankName).exists()).toBeTruthy()
        expect(component.find(AccountName).exists()).toBeTruthy()
        expect(component.find(AccountNumber).exists()).toBeTruthy()
    })

    it('should update state when an input changes', () => {
        const component = shallow(
            <Transfer
                {...props}
            />
        )

        component.setState({ to_account: 'others' })

        var from_account = component.find(FromAccount)
        var to_account = component.find(ToAccount)
        var amount = component.find(Amount)
        var password = component.find(Password)
        var narration = component.find(Narration)
        var bank_name = component.find(BankName)
        var account_name = component.find(AccountName)
        var account_number = component.find(AccountNumber)

        simulateChange(from_account, mockState.from_account, 'from_account')
        simulateChange(to_account, mockState.to_account, 'to_account')
        simulateChange(amount, mockState.amount, 'amount')
        simulateChange(password, mockState.password, 'password')
        simulateChange(narration, mockState.narration, 'narration')
        simulateChange(bank_name, mockState.bank_name, 'bank_name')
        simulateChange(account_name, mockState.account_name, 'account_name')
        simulateChange(account_number, mockState.account_number, 'account_number')

        expect(component.state().from_account).toEqual(mockState.from_account)
        expect(component.state().to_account).toEqual(mockState.to_account)
        expect(component.state().amount).toEqual(mockState.amount)
        expect(component.state().password).toEqual(mockState.password)
        expect(component.state().narration).toEqual(mockState.narration)
        expect(component.state().bank_name).toEqual(mockState.bank_name)
        expect(component.state().account_name).toEqual(mockState.account_name)
        expect(component.state().account_number).toEqual(mockState.account_number)
    })

    it('should call handleSubmit function when the button is clicked', () => {

        var transfer = jest.fn()

        const component = shallow(
            <Transfer
                {...props}
                transfer={transfer}
            />
        )

        const handleSubmit = mockInstance(component, 'handleSubmit')

        var transferBtn = component.find(CustomButton).find({ title: 'Send' })

        transferBtn.simulate('click', { preventDefault: () => null, isTest: true })

        expect(handleSubmit).toBeCalled()
        expect(handleSubmit).toBeCalledTimes(1)
        expect(transfer).toBeCalled()
        expect(transfer).toBeCalledTimes(1)
        expect(component.state().formSending).toBeTruthy()
    })
})
