import React, { Fragment } from 'react';
import { Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { UserAccountsSelect } from '../assets/Parsers';
import { CustomButton, CustomSelect } from './CustomInputs';

export function Filters({ filterOptions, handleFilterChange, state, handleFilter, resetFilters, user }) {
    return (
        <Fragment>
            <Form.Row>
                {
                    filterOptions.map((option, index) => (
                        <Fragment key={index}>
                            {
                                option === 'account_number' &&
                                <Form.Group as={Col} md={3} className="mb-3">
                                    <CustomSelect name="account_number" onChange={handleFilterChange} placeholder="Account..." required={false} options={UserAccountsSelect(user.accounts)} value={state.filters.account_number} />
                                </Form.Group>
                            }
                            {
                                option === 'type' &&
                                <Form.Group as={Col} md={3} className="mb-3">
                                    <CustomSelect name="type" onChange={handleFilterChange} placeholder="Type..." required={false} options={[
                                        { value: 'credit', label: 'Credit' },
                                        { value: 'debit', label: 'Debit' }
                                    ]} value={state.filters.type} />
                                </Form.Group>
                            }
                        </Fragment>
                    ))
                }
                <Form.Group as={Col} md={12} className="mb-3">
                    <CustomButton loading={state.filterLoading} disabled={state.filterLoading} className="mb-3 mr-3" type="button" icon='search' title="Search" variant="success" onClick={handleFilter} />
                    <CustomButton loading={state.filterLoading} disabled={state.filterLoading} className="mb-3 mr-3" type="button" icon='sync' title="Reset" variant="info" onClick={resetFilters} />
                </Form.Group>
            </Form.Row>
        </Fragment>
    )
}


const mapStateToProps = ({ users }) => {
    return {
        user: users.auth.user,
    }
}

export default connect(mapStateToProps)(Filters)