import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Badge, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getAccounts } from '../../../store/actions/accountActions'
import { FormatNumber } from '../../assets/Parsers'
import AccountsTableComponent from '../../layouts/AccountsTableComponent'
import { Pagination, Hr } from '../../layouts/CustomLayouts'
import MainLayout from '../../layouts/MainLayout'
import TableLayout from '../../layouts/TableLayout'
import { formAction } from '../../../store/actions/formActions'
import { apiLinks } from '../../../routes/ApiLinks'
import { userProfile } from '../../../store/actions/profileActions'
import { NavLink } from 'react-router-dom'
import { routeLinks } from '../../../routes/NavLinks'

class Accounts extends Component {

    state = {
        page: 1,
        loaded: false,
        pageLoading: false,
    }

    componentDidMount = () => {
        if (this.props.accounts) {
            this.setState({
                loaded: true
            })
        }
        this.props.getAccounts()
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.accounts !== this.props.accounts) {
            this.setState({
                loaded: true,
                pageLoading: false,
                page: nextProps.accounts.current_page
            })
        }
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                pageLoading: false
            }, () => {
                if (nextProps.formSuccess) {
                    this.props.getAccounts(this.state.page)
                    this.props.userProfile()
                }
            })
        }
    }

    handlePageClick = (data) => {
        this.setState({
            page: data.selected + 1,
            pageLoading: true
        }, () => {
            this.props.getAccounts(this.state.page)
        })
    }

    handleStatus = (account_number) => {
        if (window.confirm('Are you sure you want to perform this action?')) {
            this.setState({
                pageLoading: true
            }, () => {
                this.props.accountStatus(account_number)
            })
        }
    }

    render() {

        const { loaded, pageLoading } = this.state

        const { accounts } = this.props

        const columns = ['S/N', 'Actions', 'Account Number', 'Type', 'Balance', 'Active', 'Transactions', 'Created On']

        const fields = ['s_n', 'actions', 'account_number', 'account_type', 'balance', 'active', 'transactions_count', 'created_at']

        const actions = ['view', 'status']

        return (
            <MainLayout show={loaded} pageTitle="Accounts">
                <div className="my-3 text-right">
                    <NavLink exact to={`${routeLinks.accounts}/create`} className="btn btn-success">
                        <i className="fas fa-plus-square"></i> Create An Account
                    </NavLink>
                </div>
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title className="font-weight-bold">
                            User Accounts <Badge variant="dark"><FormatNumber number={accounts.total || 0} /></Badge>
                        </Card.Title>
                        <Hr align="left" />
                        <Pagination handlePageClick={this.handlePageClick} item={accounts} pageCount={accounts.last_page} position="left" showPage pageLoading={pageLoading} />
                        <TableLayout loading={pageLoading} columns={columns}>
                            {
                                accounts && accounts.data.map((account, index) => (
                                    <AccountsTableComponent
                                        handleStatus={this.handleStatus}
                                        actions={actions}
                                        account={account}
                                        fields={fields}
                                        serial={index + 1}
                                        key={index}
                                    />
                                ))
                            }
                        </TableLayout>
                    </Card.Body>
                </Card>
            </MainLayout>
        )
    }
}

Accounts.propTypes = {
    accounts: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    getAccounts: PropTypes.func,
    accountStatus: PropTypes.func,
    userProfile: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccounts: (page) => dispatch(getAccounts(page)),
        accountStatus: (account_number) => dispatch(formAction('put', `${apiLinks.account}/${account_number}`)),
        userProfile: () => dispatch(userProfile())
    }
}

const mapStateToProps = ({ users, app }) => {
    return {
        accounts: users.accounts.accounts,
        formError: app.form.formError,
        formSuccess: app.form.formSuccess,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)