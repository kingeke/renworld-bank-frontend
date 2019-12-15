import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { apiLinks } from '../../../routes/ApiLinks'
import { formAction } from '../../../store/actions/formActions'
import { userProfile } from '../../../store/actions/profileActions'
import { CustomButton } from '../../layouts/CustomInputs'
import { Amount, FormLayout, FromAccount } from '../../layouts/Forms'
import MainLayout from '../../layouts/MainLayout'
require('parsleyjs')

export class FundAccount extends Component {

    formRef = React.createRef()

    initialState = {
        account: '',
        amount: '',
        formSending: false
    }

    state = this.initialState

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.formError || nextProps.formSuccess) {
            this.setState({
                formSending: false
            }, () => {
                if (nextProps.formSuccess) {
                    this.setState(this.initialState)
                    this.props.userProfile()
                    if (this.formRef.current) {
                        $(this.formRef.current).parsley().reset();
                    }
                }
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        var form = $(this.formRef.current).parsley()

        if (e.isTest || form.isValid()) {
            e.preventDefault()
            this.setState({
                formSending: true
            }, () => {
                this.props.fund(this.state.account, this.state)
            })
        }
    }

    render() {

        const { user } = this.props

        return (
            <MainLayout pageTitle="Fund Account">
                <FormLayout>
                    <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit}>
                        <FromAccount name="account" label="Account" accounts={user.accounts} from_account={this.state.account} onChange={this.handleChange} />
                        <Amount amount={this.state.amount} onChange={this.handleChange} />
                        <CustomButton block type="submit" icon='check' loading={this.state.formSending} title="Fund" variant="success" onClick={this.handleSubmit} />
                    </Form>
                </FormLayout>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fund: (account_number, data) => dispatch(formAction('post', `${apiLinks.account}/${account_number}`, data)),
        userProfile: () => dispatch(userProfile())
    }
}

const mapStateToProps = ({ app, users }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess,
        user: users.auth.user
    }
}

FundAccount.propTypes = {
    user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    fund: PropTypes.func,
    userProfile: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(FundAccount)