import Axios from "axios";
import { showNotification } from "../../components/includes/Notifications";
import { apiLinks } from "../../routes/ApiLinks";
import { DASHBOARD_DEFAULT, SET_DASHBOARD } from "../reducers/types";
import { UserAuth } from "../../services/AuthService";

export const dashboardDefault = () => {
    return {
        type: DASHBOARD_DEFAULT
    }
}

export const getDashboard = () => {
    return (dispatch) => {
        return Axios.get(apiLinks.dashboard, UserAuth.getHeaders()).then(
            response => {

                let data = response.data

                if (data.status === 'success') {
                    return dispatch({
                        type: SET_DASHBOARD,
                        transactions: data.transactions,
                        accounts: data.accounts,
                        balance: data.balance,
                        recent_transactions: data.recent_transactions,
                    })

                }
                else {
                    return dispatch({
                        type: DASHBOARD_DEFAULT
                    })
                }
            }
        ).catch(
            error => {
                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger');

                return dispatch({
                    type: DASHBOARD_DEFAULT
                })
            }
        )
    }
}