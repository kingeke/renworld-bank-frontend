import React, { Component, Fragment } from 'react'
import { Card, Container } from 'react-bootstrap'

export default class ErrorBoundary extends Component {

    state = {
        hasError: false
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        })
    }

    render() {

        const { hasError } = this.state

        return (
            <Fragment>
                {
                    hasError ?
                        <Container className="my-5">
                            <Card>
                                <Card.Body>
                                    <p>An unknown error occurred, please refresh the page. If the problem persists, please contact us</p>
                                </Card.Body>
                            </Card>
                        </Container>
                        : this.props.children
                }
            </Fragment>
        )
    }
}
