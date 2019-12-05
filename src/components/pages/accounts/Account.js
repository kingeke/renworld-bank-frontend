import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { apiLinks } from '../../../routes/ApiLinks'
import { getAccount } from '../../../store/actions/accountActions'
import { formAction } from '../../../store/actions/formActions'
import MainLayout from '../../layouts/MainLayout'
import AccountLayout from './components/AccountLayout'
import TransactionsTable from './components/TransactionsTable'
import { getTransaction } from '../../../store/actions/transactionActions'
import { userProfile } from '../../../store/actions/profileActions'

class Account extends Component {

    account_number = this.props.match.params.account_number

    state = {
        loaded: false,
        formSending: false,
        pageLoading: false,
        page: 1
    }

    componentDidMount = () => {
        if (this.props.account.account_number === this.account_number) {
            this.setState({
                loaded: true
            })
        }
        this.props.getAccount(this.account_number)
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.account !== this.props.account) {
            this.setState({
                loaded: true,
                pageLoading: false,
                page: nextProps.account.transactions.current_page
            })
        }
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false
            }, () => {
                if (nextProps.formSuccess) {
                    this.props.getAccount(this.account_number)
                    this.props.userProfile()
                }
            })
        }
    }

    handleStatus = () => {
        if (window.confirm('Are you sure you want to perform this action?')) {
            this.setState({
                formSending: true
            }, () => {
                this.props.accountStatus(this.account_number)
            })
        }
    }

    handleView = (transaction) => {
        this.props.getTransaction(transaction)
    }

    handlePageClick = (data) => {
        this.setState({
            page: data.selected + 1,
            pageLoading: true
        }, () => {
            this.props.getAccount(this.account_number, this.state.page)
        })
    }

    render() {

        const { formSending, pageLoading, loaded } = this.state

        const { account } = this.props

        return (
            <MainLayout show={loaded} pageTitle={`Account: ${account.account_number}`}>
                <AccountLayout
                    account={account}
                    formSending={formSending}
                    handleStatus={this.handleStatus}
                />
                <TransactionsTable
                    handlePageClick={this.handlePageClick}
                    handleView={this.handleView}
                    pageLoading={pageLoading}
                    transactions={account.transactions}
                />
            </MainLayout>
        )
    }
}

Account.propTypes = {
    account: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    getAccount: PropTypes.func,
    getTransaction: PropTypes.func,
    accountStatus: PropTypes.func,
    userProfile: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccount: (account_number, transactions_page) => dispatch(getAccount(account_number, transactions_page)),
        accountStatus: (account_number) => dispatch(formAction('put', `${apiLinks.account}/${account_number}`)),
        getTransaction: (transaction) => dispatch(getTransaction(transaction)),
        userProfile: () => dispatch(userProfile())
    }
}

const mapStateToProps = ({ users, app }) => {
    return {
        account: users.accounts.account,
        formError: app.form.formError,
        formSuccess: app.form.formSuccess,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)