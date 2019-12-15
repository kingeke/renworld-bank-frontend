import { Dashboard } from "../../../../components/pages/dashboard/Dashboard"
import MainLayout from "../../../../components/layouts/MainLayout"
import CardOverview from "../../../../components/pages/dashboard/components/CardOverview"
import RecentTransactions from "../../../../components/pages/dashboard/components/RecentTransactions"

describe('<Dashboard />', () => {

    var props = {
        getDashboard: jest.fn(),
        getTransaction: jest.fn(),
        loaded: true
    }

    it('should render the component correctly', () => {
        const component = shallow(
            <Dashboard
                {...props}
            />
        )

        expect(props.getDashboard).toBeCalled()
        expect(props.getDashboard).toBeCalledTimes(1)
        expect(component.find(MainLayout).find({ pageTitle: 'Dashboard' }).exists()).toBeTruthy()
        expect(component.find(CardOverview).exists()).toBeTruthy()
        expect(component.find(RecentTransactions).exists()).toBeTruthy()
    })

    it('should call handleView when the button is clicked', () => {
        const component = shallow(
            <Dashboard
                {...props}
            />
        )

        component.find(RecentTransactions).prop('handleView')()

        expect(props.getTransaction).toBeCalled()
        expect(props.getTransaction).toBeCalledTimes(1)
    })
})
