import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { FormatDate, FormatNumber } from '../../../assets/Parsers'
import { Label, CustomButton } from '../../../layouts/CustomInputs'

export default function AccountLayout({ account, handleStatus, formSending }) {

    const accountLayout = [
        {
            label: 'Account Type',
            value: account.account_type
        },
        {
            label: 'Account Status',
            value: account.active ? 'Active' : 'Closed'
        },
        {
            label: 'Current Balance',
            value: <FormatNumber number={account.balance} withNaira />
        },
        {
            label: 'Created On',
            value: <FormatDate date={account.created_at} withTime />
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
                <CustomButton type="button" icon={`${account.active ? 'times' : 'check'}`} loading={formSending} title={`${account.active ? 'Close' : 'Open'} Account`} variant={`${account.active ? 'danger' : 'success'}`} onClick={handleStatus} />
            </Card.Body>
        </Card>
    )
}
