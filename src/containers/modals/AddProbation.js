import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest, updateProbationStore } from '../../actions/profile';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import A from '../pages/Form'

class AddProbation extends React.Component{
  constructor(props){
    super(props);
    this.state = props;
    this.B = React.createRef()
    this.type = (this.props.profile.eva == null ? 'addProbation':'updateProbation')
  }
  componentDidMount(){
    console.log(this.state.submitting);
  }
  render(){
    return(
      <Modal
        header={this.props.profile.eva == null ? 'Add Probation':'View Probation'}
        onClose={this.props.onClose}
        onClick={()=>this.props.onSubmit(this.props.item,(this.props.profile.eva == null ? 'addProbation':'updateProbation'))}
        submitting={this.props.submitting}
        size="large"
      >
        <A ref={this.B} test={this.props.onChange} profile={this.props.profile}/>
      </Modal>
    );
  }
}

AddProbation.defaultProps = {
  submitting: false
};

AddProbation.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.profile.item,
  modalName: state.modal.name,
  profile: state.profile,
  submitting: state.profile.submitting
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: (item,type) =>  (new Promise((resolve,reject)=> (
    dispatch(updateProfileRequest(item,resolve,reject,type))
  ))),

  onClick: () => dispatch(submit('addProbationProfile')),
  onChange: (item) => dispatch(updateProbationStore(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProbation);
