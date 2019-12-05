import React, { Fragment } from 'react'
import NavBar from '../assets/NavBar'
import { Container } from 'react-bootstrap'
import { Loader } from './CustomLayouts'
import TopBar from './TopBar'
import ErrorBoundary from '../includes/ErrorBoundary'
import Footer from '../assets/Footer'

export default function MainLayout({ show = true, children, pageTitle = false }) {
    return (
        <Fragment>
            <NavBar />
            <Container className="mb-5">
                <ErrorBoundary>
                    {
                        show ?
                            <Fragment>
                                {pageTitle && <TopBar pageTitle={pageTitle} />}
                                {children}
                            </Fragment>
                            : <Loader />
                    }
                </ErrorBoundary>
            </Container>
            <Footer />
        </Fragment>
    )
}