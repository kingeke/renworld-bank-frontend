import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'react-bootstrap'
import { FormatNumber } from '../../../assets/Parsers'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { routeLinks } from '../../../../routes/NavLinks'

export function CardOverview({ accounts, transactions, balance }) {

    var cards = [
        {
            title: 'Accounts',
            number: accounts,
            color: 'primary',
            to: routeLinks.accounts,
            icon: 'piggy-bank'
        },
        {
            title: 'Transactions',
            number: transactions,
            color: 'warning',
            to: routeLinks.transactions,
            icon: 'box-open'
        },
        {
            title: 'Balance',
            number: balance,
            color: 'success',
            to: routeLinks.accounts,
            withNaira: true,
            icon: 'wallet'
        }
    ]

    return (
        <Row>
            {
                cards.map((item, index) => (
                    <Col lg={4} md={6} key={index} className="mb-3">
                        <NavLink exact to={item.to} className="text-decoration-none">
                            <Card body className="shadow-sm">
                                <Row>
                                    <Col xs={7}>
                                        <p className="text-muted">{item.title}</p>
                                        <p className="font-weight-bold text-black">
                                            <FormatNumber number={item.number} withNaira={item.withNaira} />
                                        </p>
                                    </Col>
                                    <Col xs={3}>
                                        <span className="fa-stack fa-2x">
                                            <i className={`fas fa-circle fa-stack-2x text-${item.color}`}></i>
                                            <i className={`fas fa-${item.icon} fa-stack-1x fa-inverse`}></i>
                                        </span>
                                    </Col>
                                </Row>
                            </Card>
                        </NavLink>
                    </Col>
                ))
            }
        </Row>
    )
}

CardOverview.propTypes = {
    transactions: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    accounts: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    balance: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
}

const mapStateToProps = ({ users }) => {
    return {
        transactions: users.dashboard.transactions,
        accounts: users.dashboard.accounts,
        balance: users.dashboard.balance
    }
}

export default connect(mapStateToProps)(CardOverview)