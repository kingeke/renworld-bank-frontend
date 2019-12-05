import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDashboard } from '../../../store/actions/dashboardActions'
import MainLayout from '../../layouts/MainLayout'
import CardOverview from './components/CardOverview'
import RecentTransactions from './components/RecentTransactions'
import { getTransaction } from '../../../store/actions/transactionActions'

export class Dashboard extends Component {

    componentDidMount = () => {
        this.props.getDashboard()
    }

    handleView = (transaction) => {
        this.props.getTransaction(transaction)
    }

    render() {
        const { loaded } = this.props

        return (
            <MainLayout show={loaded} pageTitle="Dashboard">
                <div className="main">
                    <CardOverview />
                    <RecentTransactions
                        handleView={this.handleView}
                    />
                </div>
            </MainLayout>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getDashboard: () => dispatch(getDashboard()),
        getTransaction: (transaction) => dispatch(getTransaction(transaction))
    }
}

const mapStateToProps = ({ users }) => {
    return {
        loaded: users.dashboard.loaded,
    }
}

Dashboard.propTypes = {
    loaded: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)