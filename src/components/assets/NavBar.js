import React, { Fragment } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { routeLinks } from '../../routes/NavLinks'
import { connect } from 'react-redux'
import { logOutAction } from '../../store/actions/authActions'
import PropTypes from 'prop-types'

function NavBar({ user, logOut }) {
    return (
        <Navbar bg="dark" variant="dark" expand="md" className="mb-5">
            <NavLink className="navbar-brand" exact to={routeLinks.index}>RenWorld Bank</NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {
                        !user &&
                        <Fragment>
                            <NavLink className="nav-link" exact to={routeLinks.login}>Login</NavLink>
                            <NavLink className="nav-link" exact to={routeLinks.signUp}>Sign Up</NavLink>
                        </Fragment>
                    }
                    {
                        user &&
                        <Fragment>
                            <NavLink className="nav-link" exact to={routeLinks.index}>Dashboard</NavLink>
                            <NavDropdown title="Transactions" alignRight>
                                <NavLink className="dropdown-item" exact to={routeLinks.transfer}>Transfer Money</NavLink>
                                <NavLink className="dropdown-item" exact to={routeLinks.transactions}>View Transactions</NavLink>
                            </NavDropdown>
                            <NavDropdown title="Accounts" alignRight>
                                <NavLink className="dropdown-item" exact to={`${routeLinks.accounts}/create`}>Create New Account</NavLink>
                                <NavLink className="dropdown-item" exact to={routeLinks.account}>Fund Account</NavLink>
                                <NavLink className="dropdown-item" exact to={routeLinks.accounts}>View Accounts</NavLink>
                            </NavDropdown>
                            <NavDropdown title="Profile" alignRight>
                                <NavLink className="dropdown-item" exact to={routeLinks.editProfile}>Edit Profile</NavLink>
                                <NavLink className="dropdown-item" exact to={routeLinks.changePassword}>Change Password</NavLink>
                                <NavLink className="dropdown-item" exact to={routeLinks.login} onClick={() => logOut()}>Log Out</NavLink>
                            </NavDropdown>
                        </Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOutAction())
    }
}

const mapStateToProps = ({ users }) => {
    return {
        user: users.auth.user
    }
}

NavBar.propTypes = {
    logOut: PropTypes.func,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)