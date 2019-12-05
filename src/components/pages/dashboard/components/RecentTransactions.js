import PropTypes from 'prop-types'
import React from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import TableLayout from '../../../layouts/TableLayout'
import TransactionTableComponent from '../../../layouts/TransactionTableComponent'

export function RecentTransactions({ loaded, recent_transactions, handleView }) {

    const columns = ['S/N', 'Actions', 'Transaction Ref', 'Type', 'Amount', 'Account Number', 'Narration', 'Created On']

    const fields = ['s_n', 'actions', 'transaction_ref', 'type', 'amount', 'account_number', 'narration', 'created_at']

    const actions = ['view']

    return (
        <Card className="shadow-sm my-5">
            <Card.Body>
                <Card.Title className="font-weight-bold">Recent Transactions</Card.Title>
                <TableLayout loading={!loaded} columns={columns}>
                    {
                        recent_transactions && recent_transactions.map((transaction, index) => (
                            <TransactionTableComponent
                                handleView={handleView}
                                actions={actions}
                                transaction={transaction}
                                fields={fields}
                                serial={index + 1}
                                key={index}
                            />
                        ))
                    }
                </TableLayout>
            </Card.Body>
        </Card>
    )
}

RecentTransactions.propTypes = {
    recent_transactions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    loaded: PropTypes.bool,
    handleView: PropTypes.func
}

const mapStateToProps = ({ users }) => {
    return {
        loaded: users.dashboard.loaded,
        recent_transactions: users.dashboard.recent_transactions
    }
}

export default connect(mapStateToProps)(RecentTransactions)
