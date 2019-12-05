import Axios from "axios";
import { showNotification } from "../../components/includes/Notifications";
import { apiLinks } from "../../routes/ApiLinks";
import { SET_WEBSITE, WEBSITE_DEFAULT } from "../reducers/types";

export const websiteDefault = () => {
    return {
        type: WEBSITE_DEFAULT
    }
}

export const getWebsite = () => {
    return (dispatch) => {
        return Axios.get(apiLinks.website).then(
            response => {
                let data = response.data

                if (data.status === 'success') {
                    return dispatch({
                        type: SET_WEBSITE,
                        banks: data.banks,
                        account_types: data.account_types
                    })

                }
                else {
                    return dispatch({
                        type: WEBSITE_DEFAULT
                    })
                }
            }
        ).catch(
            error => {
                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger');

                return dispatch({
                    type: WEBSITE_DEFAULT
                })
            }
        )
    }
}