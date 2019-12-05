import Axios from "axios";
import { showNotification } from "../../components/includes/Notifications";
import { apiLinks } from "../../routes/ApiLinks";
import { UserAuth } from "../../services/AuthService";
import { SET_TRANSACTION, SET_TRANSACTIONS, TRANSACTIONS_DEFAULT, TRANSACTION_DEFAULT } from "../reducers/types";

export const transactionsDefault = () => {
    return {
        type: TRANSACTIONS_DEFAULT
    }
}

export const transactionDefault = () => {
    return {
        type: TRANSACTION_DEFAULT
    }
}

export const getTransactions = (page = 1, filters = null) => {
    return (dispatch) => {
        return Axios.get(apiLinks.transactions, {
            params: {
                page,
                filters
            },
            headers: UserAuth.getHeaders().headers
        }).then(
            response => {
                let data = response.data

                if (data.status === 'success') {
                    return dispatch({
                        type: SET_TRANSACTIONS,
                        transactions: data.transactions,
                    })

                }
                else {
                    return dispatch({
                        type: TRANSACTIONS_DEFAULT
                    })
                }
            }
        ).catch(
            error => {
                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger');

                return dispatch({
                    type: TRANSACTIONS_DEFAULT
                })
            }
        )
    }
}

export const getTransaction = (transaction = false, transaction_ref = false) => {
    return (dispatch) => {
        if (transaction) {
            return dispatch({
                type: SET_TRANSACTION,
                transaction
            })
        }
        else {
            return Axios.get(`${apiLinks.transaction}/${transaction_ref}`, UserAuth.getHeaders()).then(
                response => {
                    let data = response.data

                    if (data.status === 'success') {
                        return dispatch({
                            type: SET_TRANSACTION,
                            transaction: data.transaction,
                        })

                    }
                    else {
                        return dispatch({
                            type: TRANSACTION_DEFAULT
                        })
                    }
                }
            ).catch(
                error => {
                    let message = (error.response && error.response.data && error.response.data.message) || error.message

                    showNotification(message, 'danger');

                    return dispatch({
                        type: TRANSACTION_DEFAULT
                    })
                }
            )
        }
    }
}