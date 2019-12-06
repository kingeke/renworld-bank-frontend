import $ from 'jquery'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { apiLinks } from '../../../routes/ApiLinks'
import { formAction } from '../../../store/actions/formActions'
import { userProfile } from '../../../store/actions/profileActions'
import { CustomButton } from '../../layouts/CustomInputs'
import { AccountName, AccountNumber, Amount, BankName, FormLayout, FromAccount, Password, ToAccount, Narration } from '../../layouts/Forms'
import MainLayout from '../../layouts/MainLayout'
require('parsleyjs')

class Transfer extends Component {

    formRef = React.createRef()

    initialState = {
        from_account: '',
        to_account: '',
        amount: '',
        bank_name: '',
        account_name: '',
        account_number: '',
        password: '',
        narration: '',
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
        }, () => {
            if (this.state.to_account !== 'others') {
                this.setState({
                    bank_name: '',
                    account_name: '',
                    account_number: '',
                })
            }
        })
    }

    handleSubmit = (e) => {
        var form = $(this.formRef.current).parsley()

        if (e.isTest || form.isValid()) {
            e.preventDefault()
            this.setState({
                formSending: true
            }, () => {
                this.props.transfer(this.state)
            })
        }
    }

    render() {

        const { user, banks } = this.props

        return (
            <MainLayout pageTitle="Transfer Money">
                <FormLayout>
                    <Form ref={this.formRef} className="form-section" onSubmit={this.handleSubmit}>
                        <FromAccount accounts={user.accounts} from_account={this.state.from_account} onChange={this.handleChange} />
                        <ToAccount accounts={user.accounts} to_account={this.state.to_account} onChange={this.handleChange} />
                        <Amount amount={this.state.amount} onChange={this.handleChange} />
                        <Password password={this.state.password} onChange={this.handleChange} />
                        {
                            this.state.to_account === 'others' &&
                            <Fragment>
                                <BankName bank_name={this.state.bank_name} onChange={this.handleChange} banks={banks} />
                                <AccountName account_name={this.state.account_name} onChange={this.handleChange} />
                                <AccountNumber account_number={this.state.account_number} onChange={this.handleChange} />
                            </Fragment>
                        }
                        <Narration narration={this.state.narration} onChange={this.handleChange} />
                        <Form.Group>
                            <CustomButton block type="submit" icon='check' loading={this.state.formSending} title="Send" variant="success" onClick={this.handleSubmit} />
                        </Form.Group>
                    </Form>
                </FormLayout>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        transfer: (data) => dispatch(formAction('post', apiLinks.account, data)),
        userProfile: () => dispatch(userProfile())
    }
}

const mapStateToProps = ({ app, users }) => {
    return {
        formError: app.form.formError,
        formSuccess: app.form.formSuccess,
        banks: app.website.banks,
        user: users.auth.user
    }
}

Transfer.propTypes = {
    user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    formError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    formSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    banks: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    transfer: PropTypes.func,
    userProfile: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfer)