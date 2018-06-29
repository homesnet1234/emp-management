import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { masterTableToOptions } from '../../utils/helper';
import A from '../pages/Form'

const validate = (values) => {
  const errors = {};
  errors.startDate = validator.required(values.startDate);
  errors.endDate = validator.required(values.endDate);
  return errors;
};

const ownFlagOptions = [
  { key: 'myself', value: true, text: 'Myself' },
  { key: 'company', value: false, text: 'Company' }
];


class AddProbationProfileForm extends React.Component{
  constructor(props){
    super(props);
    this.B = React.createRef()
  }
  componentDidMount(){
    console.log(this.B.current.state);
  }
  render(){
    return(<div><A ref={this.B}/></div>);
  }
}

AddProbationProfileForm.propTypes = {
  masterTable: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  ownFlag: PropTypes.bool.isRequired
};

const selector = formValueSelector('addAssetProfile');

const mapStateToProps = state => ({
  masterTable: state.masterTable,
  initialValues: {
    userId: state.profile.id,
    ownFlag: true
  },
  ownFlag: selector(state, 'ownFlag')
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'addAssetProfile',
    validate
  })
);

export default enhance(AddProbationProfileForm);
