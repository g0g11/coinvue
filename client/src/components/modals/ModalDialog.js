import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import { connectModal } from 'redux-modal';

class ModalDialog extends Component {
  constructor(props) {
    super(props);
  };

  static propTypes = {
    message: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired,
  };

  handleClose(values) {
    console.log(this);
  }

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
            onClick={ handleHide }
            labelPosition='right'
            content='Great!'
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connectModal({ name: 'modal' })(ModalDialog);
