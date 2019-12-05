import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import TableLayout from '../../../layouts/TableLayout'
import TransactionTableComponent from '../../../layouts/TransactionTableComponent'
import { FormatNumber } from '../../../assets/Parsers'
import { Pagination } from '../../../layouts/CustomLayouts'

export default function TransactionsTable({ transactions, pageLoading, handlePageClick, handleView, }) {

    const columns = ['S/N', 'Actions', 'Transaction Ref', 'Type', 'Previous Balance', 'Amount', 'Current Balance', 'Narration', 'Created On']

    const fields = ['s_n', 'actions', 'transaction_ref', 'type', 'previous_balance', 'amount', 'current_balance', 'narration', 'created_at']

    const actions = ['view']

    return (
        <Card className="shadow-sm my-5">
            <Card.Body>
                <Card.Title className="font-weight-bold">
                    Transactions <Badge variant="dark"><FormatNumber number={transactions.total || 0} /></Badge>
                </Card.Title>
                <Pagination handlePageClick={handlePageClick} item={transactions} pageCount={transactions.last_page} position="left" showPage pageLoading={pageLoading} />
                <TableLayout loading={pageLoading} columns={columns}>
                    {
                        transactions && transactions.data.map((transaction, index) => (
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
