import { App } from "../App"
import Routes from "../routes/Routes"
import { Loader } from "../components/layouts/CustomLayouts"

describe('<App />', () => {
    it('should render the component correctly', () => {

        var userProfile = jest.fn()
        var getWebsite = jest.fn()

        let component = shallow(
            <App
                userProfile={userProfile}
                getWebsite={getWebsite}
            />
        )

        expect(userProfile).toBeCalled()
        expect(userProfile).toBeCalledTimes(1)
        expect(getWebsite).toBeCalled()
        expect(getWebsite).toBeCalledTimes(1)

        expect(component.find(Routes).exists()).toBeTruthy()
        expect(component.find(Loader).exists()).toBeFalsy()
    })

    it('should show the loader if a userLoading and websiteLoading is true', () => {

        var userProfile = jest.fn()
        var getWebsite = jest.fn()

        let component = shallow(
            <App
                userProfile={userProfile}
                getWebsite={getWebsite}
                userLoading={true}
                websiteLoading={true}
            />
        )

        expect(component.find(Routes).exists()).toBeFalsy()
        expect(component.find(Loader).exists()).toBeTruthy()
    })
})
