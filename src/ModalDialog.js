import React, {Component} from "react";
import {Modal,Button} from "react-bootstrap";

export default class ModalDialog extends Component {
  render() {
    return (<div>
<div>
<Modal className="modal-container"
show={true}
onHide={this.props.handleHideModal}
animation={true}
bsSize="small">
  <Modal.Header closeButton>
    <Modal.Title>Open Modal</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Select .CHR File
  </Modal.Body>
  <Modal.Footer>
    <input type="file" id="file" name="file" />
    <Button onClick={this.props.handleHideModal}>Close</Button>
    <Button bsStyle= "primary">Load</Button>
  </Modal.Footer>
</Modal>
</div>
</div>)
  }
}
