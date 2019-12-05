import React from 'react';
import { NavLink } from 'react-router-dom';
import { routeLinks } from '../../routes/NavLinks';
import { FormatDate, FormatNumber } from '../assets/Parsers';
import PropTypes from 'prop-types'

export default function AccountsTableComponent({ account, fields, actions, serial, handleStatus }) {

    const data = fields.map((value, index) => {
        return (
            <td key={index} className={value === 'actions' ? 'text-center' : ''}>

                {value === 's_n' && serial}

                {value === 'account_number' && account.account_number}

                {value === 'account_type' && account.account_type}

                {value === 'active' && (account.active ? 'Active' : 'Closed')}

                {value === 'balance' && <FormatNumber number={account.balance} withNaira />}

                {value === 'transactions_count' && <FormatNumber number={account.transactions_count} />}

                {value === 'created_at' && <FormatDate number={account.created_at} withTime />}

                {value === 'updated_at' && <FormatDate number={account.updated_at} withTime />}

                {
                    value === 'actions' &&
                    actions.map((value, index) => {
                        return (
                            <span key={index}>
                                {
                                    value === 'view' &&
                                    <NavLink key={index} exact to={`${routeLinks.account}/${account.account_number}`}><i className="fas fa-eye text-info mr-2" title="View account"></i></NavLink>
                                }
                                {
                                    value === 'status' &&
                                    <span key={index} onClick={() => handleStatus(account.account_number)}><i className={`fas fa-${account.active ? 'times' : 'check'} text-${account.active ? 'danger' : 'success'} mr-2`} title={`${account.active ? 'Close' : 'Open'} Account`}></i></span>
                                }
                            </span>
                        )
                    })
                }
            </td>
        )
    })

    return (
        <tr>
            {data}
        </tr>
    )
}

AccountsTableComponent.propTypes = {
    account: PropTypes.object,
    fields: PropTypes.arrayOf(PropTypes.string),
    serial: PropTypes.number,
    actions: PropTypes.arrayOf(PropTypes.string)
}