import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class ShowAnn extends Component {
  renderRelated(props) {
    if (props.similar1 !== undefined)
      return (
        <div className="mt-3">
          <h5 className="mb-3">Related</h5>
          <p className="mt-1">{this.props.similar1}</p>
          <p className="mt-1">{this.props.similar2}</p>
          <p className="mt-1">{this.props.similar3}</p>
        </div>
      );
  }

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="float-right">
              {new Date(this.props.dateAdded).toLocaleDateString("en-UK", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="w-75">{this.props.description}</p>
            {this.renderRelated(this.props)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ShowAnn;
