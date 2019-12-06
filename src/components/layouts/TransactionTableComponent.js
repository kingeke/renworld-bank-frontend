import React from 'react';
import { NavLink } from 'react-router-dom';
import { routeLinks } from '../../routes/NavLinks';
import { FormatDate, FormatNumber } from '../assets/Parsers';
import PropTypes from 'prop-types'

export default function TransactionTableComponent({ transaction, fields, actions, serial, handleView }) {

    const data = fields.map((value, index) => {
        return (
            <td key={index} className={value === 'actions' ? 'text-center' : ''}>

                {value === 's_n' && serial}

                {value === 'transaction_ref' && transaction.transaction_ref}

                {value === 'account_number' && transaction.account.account_number}

                {value === 'type' && transaction.type}

                {value === 'narration' && transaction.narration}

                {value === 'previous_balance' && <FormatNumber number={transaction.previous_balance} withNaira />}

                {value === 'amount' && <FormatNumber number={transaction.amount} withNaira />}

                {value === 'current_balance' && <FormatNumber number={transaction.current_balance} withNaira />}

                {value === 'created_at' && <FormatDate date={transaction.created_at} withTime />}

                {value === 'updated_at' && <FormatDate date={transaction.updated_at} withTime />}

                {
                    value === 'actions' &&
                    actions.map((value, index) => {
                        return (
                            <span key={index}>
                                {
                                    value === 'view' &&
                                    <NavLink key={index} exact to={`${routeLinks.transaction}/${transaction.transaction_ref}`} onClick={() => handleView(transaction)}><i className="fas fa-eye text-info mr-2" title="View Transaction"></i></NavLink>
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

TransactionTableComponent.propTypes = {
    transaction: PropTypes.object,
    fields: PropTypes.arrayOf(PropTypes.string),
    serial: PropTypes.number,
    actions: PropTypes.arrayOf(PropTypes.string)
}