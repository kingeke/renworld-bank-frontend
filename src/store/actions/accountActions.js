import Axios from "axios";
import { showNotification } from "../../components/includes/Notifications";
import { apiLinks } from "../../routes/ApiLinks";
import { UserAuth } from "../../services/AuthService";
import { ACCOUNTS_DEFAULT, ACCOUNT_DEFAULT, SET_ACCOUNTS, SET_ACCOUNT } from "../reducers/types";

export const accountDefault = () => {
    return {
        type: ACCOUNT_DEFAULT
    }
}

export const accountsDefault = () => {
    return {
        type: ACCOUNTS_DEFAULT
    }
}

export const getAccounts = (page = 1) => {
    return (dispatch) => {
        return Axios.get(apiLinks.accounts, {
            params: {
                page
            },
            headers: UserAuth.getHeaders().headers
        }).then(
            response => {
                let data = response.data

                if (data.status === 'success') {
                    return dispatch({
                        type: SET_ACCOUNTS,
                        accounts: data.accounts,
                    })

                }
                else {
                    return dispatch({
                        type: ACCOUNTS_DEFAULT
                    })
                }
            }
        ).catch(
            error => {
                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger');

                return dispatch({
                    type: ACCOUNTS_DEFAULT
                })
            }
        )
    }
}

export const getAccount = (account_number, transactions_page = 1) => {
    return (dispatch) => {
        return Axios.get(`${apiLinks.account}/${account_number}`, {
            params: {
                transactions: transactions_page
            },
            headers: UserAuth.getHeaders().headers
        }).then(
            response => {
                let data = response.data

                if (data.status === 'success') {
                    return dispatch({
                        type: SET_ACCOUNT,
                        account: data.account,
                    })

                }
                else {
                    return dispatch({
                        type: ACCOUNT_DEFAULT
                    })
                }
            }
        ).catch(
            error => {
                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger');

                return dispatch({
                    type: ACCOUNT_DEFAULT
                })
            }
        )
    }
}