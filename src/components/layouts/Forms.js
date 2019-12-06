import React from 'react';
import { Col, Row } from "react-bootstrap";
import { CustomForm, CustomSelect } from "./CustomInputs";
import { UserAccountsSelect } from '../assets/Parsers';

export const Email = ({ label = "Email", onChange, email, placeholder = "Enter your email" }) => (
    <CustomForm label={label} type="email" placeholder={placeholder} name="email" onChange={onChange} value={email} />
)

export const Name = ({ onChange, name, placeholder = "Enter your name", label = "Fullname" }) => (
    <CustomForm label={label} type="text" placeholder={placeholder} minLength="3" name="name" onChange={onChange} value={name} />
)

export const Amount = ({ onChange, amount, placeholder = "Enter amount", label = "Amount" }) => (
    <CustomForm label={label} type="number" placeholder={placeholder} name="amount" onChange={onChange} value={amount} />
)

export const Balance = ({ onChange, balance, placeholder = "Enter starting balance", label = "Balance" }) => (
    <CustomForm label={label} type="number" placeholder={placeholder} name="balance" onChange={onChange} value={balance} />
)

export const Narration = ({ onChange, narration, placeholder = "Enter narration", label = "Narration" }) => (
    <CustomForm label={label} type="text" placeholder={placeholder} name="narration" onChange={onChange} value={narration} required={false} />
)

export const Password = ({ id = "password", onChange, password, label = "Password", placeholder = "Enter your password", name = "password" }) => (
    <CustomForm id={id} label={label} type="password" placeholder={placeholder} name={name} onChange={onChange} value={password} minLength="6" />
)

export const ConfirmPassword = ({ onChange, password_confirmation, placeholder = "Re-enter your password" }) => (
    <CustomForm label="Confirm Password" type="password" placeholder={placeholder} name="password_confirmation" onChange={onChange} value={password_confirmation} minLength="6" equalTo="#password" />
)

export const FromAccount = ({ name = "from_account", label = "From", from_account, onChange, placeholder = "Select account", accounts }) => (
    <CustomSelect name={name} label={label} onChange={onChange} placeholder={placeholder} options={UserAccountsSelect(accounts)} value={from_account} />
)

export const ToAccount = ({ to_account, onChange, placeholder = "Select account", accounts }) => (
    <CustomSelect name="to_account" label="To" onChange={onChange} placeholder={placeholder} options={UserAccountsSelect(accounts)} value={to_account} withOthers />
)

export const BankName = ({ bank_name, onChange, placeholder = "Select bank name", banks }) => (
    <CustomSelect name="bank_name" label="Bank Name" onChange={onChange} placeholder={placeholder} options={banks} value={bank_name} useLabel />
)

export const AccountType = ({ account_type, onChange, placeholder = "Select account type", account_types }) => (
    <CustomSelect name="account_type" label="Account Type" onChange={onChange} placeholder={placeholder} options={account_types} value={account_type} useLabel />
)

export const AccountName = ({ onChange, account_name, placeholder = "Enter account name", label = "Account Name" }) => (
    <CustomForm label={label} type="text" placeholder={placeholder} minLength="3" name="account_name" onChange={onChange} value={account_name} />
)

export const AccountNumber = ({ onChange, account_number, placeholder = "Enter account number", label = "Account Number" }) => (
    <CustomForm label={label} maxLength="10" type="text" placeholder={placeholder} minLength="10" name="account_number" onChange={onChange} value={account_number} />
)

export const FormLayout = ({ children }) => (
    <Row>
        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
            {children}
        </Col>
    </Row>
)