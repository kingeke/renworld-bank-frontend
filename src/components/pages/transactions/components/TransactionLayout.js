import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { FormatDate, FormatNumber } from '../../../assets/Parsers'
import { Label } from '../../../layouts/CustomInputs'

export default function TransactionLayout({ transaction }) {

    const accountLayout = [
        {
            label: 'Account Number',
            value: transaction.account.account_number
        },
        {
            label: 'Account Type',
            value: transaction.account.account_type
        },
        {
            label: 'Transaction Type',
            value: transaction.type
        },
        {
            label: 'Narration',
            value: transaction.narration
        },
        {
            label: 'Previous Balance',
            value: <FormatNumber number={transaction.previous_balance} withNaira />
        },
        {
            label: 'Amount',
            value: <FormatNumber number={transaction.amount} withNaira />
        },
        {
            label: 'Current Balance',
            value: <FormatNumber number={transaction.current_balance} withNaira />
        },
        {
            label: 'Created On',
            value: <FormatDate date={transaction.created_at} withTime />
        }
    ]

    return (
        <Card>
            <Card.Body>
                <Row>
                    {
                        accountLayout.map((item, index) => (
                            <Col md={6} key={index} className="py-3">
                                <Label className="form-control-label font-weight-bold" required={false} label={item.label} name={item.label} />
                                <p>{item.value}</p>
                            </Col>
                        ))
                    }
                </Row>
            </Card.Body>
        </Card>
    )
}
