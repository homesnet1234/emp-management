import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, change } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { masterTableToOptions } from '../../utils/helper';

const validate = (values) => {
  const errors = {};
  errors.startDate = validator.required(values.startDate);
  errors.endDate = validator.required(values.endDate);
  return errors;
};

const AddEmployeeForm = ({ handleSubmit, submitting, masterTable }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field name="firstName" as={Form.Input} component={Input} label="First name" placeholder="First name" disabled={submitting} />
      <Field name="lastName" as={Form.Input} component={Input} label="Last name" placeholder="Last name" disabled={submitting} />
    </Form.Group>
    <Field name="email" as={Form.Input} component={Input} label="E-mail" placeholder="E-mail" disabled={submitting} />
    <Field name="citizenId" as={Form.Input} component={Input} label="citizenId" placeholder="citizenId" disabled={submitting} />
    <Field name="level" as={Form.Select} component={Input} label="Level" placeholder="Level" options={masterTableToOptions(masterTable.levels)} disabled={submitting} />
    <Field name="department" as={Form.Select} component={Input} label="Department" placeholder="Department" options={masterTableToOptions(masterTable.departments)} disabled={submitting} />
    <Field name="startDate" as={Form.Input} component={Input} label="Start date" placeholder="Start date" disabled={submitting} />
    <Field name="probationDate" as={Form.Input} component={Input} label="Probation date" placeholder="Probation date" disabled={submitting} />
  </Form>
);

AddEmployeeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  masterTable: PropTypes.object.isRequired
};

// const selector = formValueSelector('addEmployee');

const mapStateToProps = state => ({
  // paymentType: selector(state, 'paymentType'),
  masterTable: state.masterTable
});

const mapDispatchToProps = dispatch => ({
  setProbationDate: value => dispatch(change('addEmployee', 'probationDate', value))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'addProject',
    validate
  })
);

export default enhance(AddEmployeeForm);
