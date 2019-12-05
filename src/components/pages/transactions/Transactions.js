import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Badge, Card, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getTransaction, getTransactions } from '../../../store/actions/transactionActions'
import { FormatNumber } from '../../assets/Parsers'
import { Pagination } from '../../layouts/CustomLayouts'
import Filters from '../../layouts/Filters'
import MainLayout from '../../layouts/MainLayout'
import TableLayout from '../../layouts/TableLayout'
import TransactionTableComponent from '../../layouts/TransactionTableComponent'
import { NavLink } from 'react-router-dom'
import { routeLinks } from '../../../routes/NavLinks'

export class Transactions extends Component {

    initialState = {
        page: 1,
        loaded: false,
        pageLoading: false,
        filterLoading: false,
        filters: {
            type: '',
            account_number: ''
        }
    }

    state = this.initialState

    componentDidMount = () => {
        this.props.getTransactions(this.state.page, this.state.filters)
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.transactions !== this.props.transactions) {
            this.setState({
                loaded: true,
                pageLoading: false,
                filterLoading: false,
                page: nextProps.transactions.current_page
            })
        }
    }

    resetFilters = () => {
        this.setState({
            filterLoading: true,
            pageLoading: true,
            filters: {
                type: '',
                account_number: ''
            }
        }, () => {
            this.props.getTransactions(this.state.page, this.state.filters)
        })
    }

    handleFilterChange = (e) => {
        var filters = this.state.filters
        filters[e.target.name] = e.target.value

        this.setState({
            filters,
        })
    }

    handleFilter = () => {
        this.setState({
            page: 1,
            filterLoading: true,
            pageLoading: true
        }, () => {
            this.props.getTransactions(this.state.page, this.state.filters)
        })
    }


    handlePageClick = (data) => {
        this.setState({
            page: data.selected + 1,
            pageLoading: true
        }, () => {
            this.props.getTransactions(this.state.page, this.state.filters)
        })
    }

    handleView = (transaction) => {
        this.props.getTransaction(transaction)
    }

    render() {

        const { loaded, pageLoading } = this.state

        const { transactions } = this.props

        const columns = ['S/N', 'Actions', 'Transaction Ref', 'Type', 'Account Number', 'Previous Balance', 'Amount', 'Current Balance', 'Narration', 'Created On']

        const fields = ['s_n', 'actions', 'transaction_ref', 'type', 'account_number', 'previous_balance', 'amount', 'current_balance', 'narration', 'created_at']

        const actions = ['view']

        return (
            <MainLayout show={loaded} pageTitle="Transactions">
                <Col lg={12} className="mb-3">
                    <h6>Filters: </h6>
                    <Filters
                        filterOptions={['account_number', 'type']}
                        handleFilter={this.handleFilter}
                        handleFilterChange={this.handleFilterChange}
                        resetFilters={this.resetFilters}
                        state={this.state}
                    />
                </Col>
                <div className="my-5">
                    <NavLink exact to={routeLinks.transfer} className="btn btn-success my-2"><i className="fas fa-plus-square"></i> Transfer Money</NavLink>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="font-weight-bold">
                                Transactions <Badge variant="dark"><FormatNumber number={transactions.total || 0} /></Badge>
                            </Card.Title>
                            <Pagination handlePageClick={this.handlePageClick} item={transactions} pageCount={transactions.last_page} position="left" showPage pageLoading={pageLoading} />
                            <TableLayout loading={pageLoading} columns={columns}>
                                {
                                    transactions && transactions.data.map((transaction, index) => (
                                        <TransactionTableComponent
                                            handleView={this.handleView}
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
                </div>
            </MainLayout>
        )
    }
}

Transactions.propTypes = {
    transactions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    getTransactions: PropTypes.func,
    setTransaction: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTransactions: (page, filters) => dispatch(getTransactions(page, filters)),
        getTransaction: (transaction) => dispatch(getTransaction(transaction))
    }
}

const mapStateToProps = ({ users, app }) => {
    return {
        transactions: users.transactions.transactions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)