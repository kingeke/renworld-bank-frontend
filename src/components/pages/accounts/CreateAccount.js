import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { apiLinks } from '../../../routes/ApiLinks'
import { formAction } from '../../../store/actions/formActions'
import { userProfile } from '../../../store/actions/profileActions'
import { CustomButton } from '../../layouts/CustomInputs'
import { AccountType, Balance, FormLayout } from '../../layouts/Forms'
import MainLayout from '../../layouts/MainLayout'
require('parsleyjs')

class CreateAccount extends Component {

    formRef = React.createRef()

    initialState = {
        account_type: '',
        balance: '',
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
                this.props.create(this.state)
            })
        }
    }

    render() {

        const { account_types } = this.props

        return (
            <MainLayout pageTitle="Create Account">
                <FormLayout>
                    <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit}>
                        <AccountType account_type={this.state.account_type} account_types={account_types} onChange={this.handleChange} />
                        <Balance balance={this.state.balance} onChange={this.handleChange} />
                        <CustomButton block type="submit" icon='check' loading={this.state.formSending} title="Create" variant="success" onClick={this.handleSubmit} />
                    </Form>
                </FormLayout>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create: (data) => dispatch(formAction('post', `${apiLinks.accounts}/create`, data)),
        userProfile: () => dispatch(userProfile())
    }
}

const mapStateToProps = ({ app, users }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess,
        account_types: app.website.account_types
    }
}


CreateAccount.propTypes = {
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    account_types: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    create: PropTypes.func,
    userProfile: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)