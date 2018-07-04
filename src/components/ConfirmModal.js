import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Modal} from 'semantic-ui-react';
import './css/ConfirmModal.css'

class ConfirmModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {open: false}
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(){
    this.setState({open: true})
  }

  closeModal(){
    this.setState({open: false});
  }

  render(){
    return(
      <div>
        <Button disabled={this.props.submitting|| this.props.disable}  onClick={this.openModal} color='blue'> Save </Button>
        <Modal
          basic
          size='small'
          open={this.state.open}
          closeOnRootNodeClick={false}
        >
          <Modal.Header icon='archive' content='Confirmation' />
          <Modal.Content>
            <p>
              ...
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red'  onClick={this.closeModal} inverted>
              <Icon name='remove' /> No
            </Button>
            <Button onClick={this.props.onClickHandle} color='green' loading={this.props.submitting} inverted>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}

export default ConfirmModal;
