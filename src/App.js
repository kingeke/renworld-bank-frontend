import React, { Component, Fragment } from 'react'
import Routes from './routes/Routes'
import { connect } from 'react-redux'
import { userProfile } from './store/actions/profileActions'
import { Container, Row, Col } from 'react-bootstrap'
import { Loader } from './components/layouts/CustomLayouts'
import PropTypes from 'prop-types'
import { getWebsite } from './store/actions/websiteActions'

export class App extends Component {

    componentDidMount = () => {
        this.props.userProfile()
        this.props.getWebsite()
    }

    render() {
        const { userLoading, websiteLoading } = this.props

        return (
            <Fragment>
                {
                    !userLoading && !websiteLoading ? <Routes /> :
                        <Container>
                            <Row className="vh-100">
                                <Col className="my-auto">
                                    <Loader />
                                </Col>
                            </Row>
                        </Container>
                }
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userProfile: () => dispatch(userProfile()),
        getWebsite: () => dispatch(getWebsite())
    }
}

const mapStateToProps = ({ users, app }) => {
    return {
        userLoading: users.auth.userLoading,
        websiteLoading: app.websiteLoading
    }
}

App.propTypes = {
    userLoading: PropTypes.bool,
    userProfile: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)