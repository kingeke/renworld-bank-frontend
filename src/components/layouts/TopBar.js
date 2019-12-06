import React from 'react'
import { avatar } from '../assets/Pictures'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

export function TopBar({ pageTitle, user }) {
    return (
        <Row className="mb-4">
            <Col sm={6}>
                <p className="text-center text-sm-left text-uppercase font-weight-bold mb-3">{pageTitle}</p>
            </Col>
            <Col className="text-center text-sm-right user-info">
                <img src={avatar} className="img-fluid rounded-circle" width="25" height="25" alt="avatar" />
                <p className="text-uppercase font-weight-bold my-auto ml-2">{user.name}</p>
            </Col>
        </Row>
    )
}

const mapStateToProps = ({ users }) => {
    return {
        user: users.auth.user
    }
}

TopBar.propTypes = {
    pageTitle: PropTypes.string,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

export default connect(mapStateToProps)(TopBar)
