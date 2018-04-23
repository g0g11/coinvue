import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import { connectModal } from 'redux-modal';

class ModalDialog extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired,
  };

  handleClose = () => {
    if (this.props.onHide) {
      this.props.onHide();
    }
  };

  render() {
    const { show, handleHide, message, title } = this.props;

    return (
      <Modal size='tiny' open={ show } onClose={ handleHide }>
        <Modal.Header>
          { title }
        </Modal.Header>
        <Modal.Content>
          <p>{ message }</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon='checkmark'
            onClick={ this.handleClose }
            labelPosition='right'
            content='Great!'
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connectModal({ name: 'modal' })(ModalDialog);
