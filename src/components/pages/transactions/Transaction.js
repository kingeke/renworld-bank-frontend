import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTransaction } from '../../../store/actions/transactionActions'
import MainLayout from '../../layouts/MainLayout'
import TransactionLayout from './components/TransactionLayout'

class Transaction extends Component {

    transaction_ref = this.props.match.params.transaction_ref

    state = {
        loaded: false,
    }

    componentDidMount = () => {
        if (this.props.transaction) {
            this.setState({
                loaded: true
            })
        }
        else {
            this.props.getTransaction(this.transaction_ref)
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.transaction !== this.props.transaction) {
            this.setState({
                loaded: true,
            })
        }
    }

    render() {

        const { loaded } = this.state

        const { transaction } = this.props

        return (
            <MainLayout show={loaded} pageTitle={`Transaction: ${transaction.transaction_ref}`}>
                <TransactionLayout
                    transaction={transaction}
                />
            </MainLayout>
        )
    }
}

Transaction.propTypes = {
    transaction: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    getTransaction: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTransaction: (transaction_ref) => dispatch(getTransaction(null, transaction_ref))
    }
}

const mapStateToProps = ({ users }) => {
    return {
        transaction: users.transactions.transaction,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)