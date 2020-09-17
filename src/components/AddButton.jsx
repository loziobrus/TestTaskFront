import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

class AddButton extends Component {
  constructor(props) {
    super(props);

    this.state = { snackBarOpen: false, snackBarMsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackBarClose = (event) => {
    this.setState({ snackBarOpen: false });
  };

  handleSubmit(event) {
    event.preventDefault();

    var xhr = new XMLHttpRequest();

    let json = JSON.stringify({
      id: 0,
      title: event.target.Title.value,
      description: event.target.Description.value,
      dateAdded: event.target.DateAdded.value,
    });

    xhr.open("post", "https://localhost:5001/api/Announcement", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    try {
      xhr.send(json);
      this.setState({
        snackBarOpen: true,
        snackBarMsg: "New announcement added.",
      });
    } catch (err) {
      this.setState({
        snackBarOpen: true,
        snackBarMsg: "Adding new announcement failed.",
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackBarOpen}
          autoHideDuration={3000}
          onClose={this.snackBarClose}
          message={<span id="msg-id">{this.state.snackBarMsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackBarClose}
            >
              x{" "}
            </IconButton>,
          ]}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add new announcement
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup controlId="Title">
                    <FormLabel>Title</FormLabel>
                    <FormControl
                      type="text"
                      name="Title"
                      required
                      placeholder="Title"
                    />
                  </FormGroup>
                  <FormGroup controlId="Description">
                    <FormLabel>Descrition</FormLabel>
                    <FormControl
                      as="textarea"
                      name="Description"
                      rows="3"
                      required
                      placeholder="Description"
                    />
                  </FormGroup>
                  <FormGroup controlId="DateAdded">
                    <FormLabel>Date added</FormLabel>
                    <FormControl
                      type="date"
                      name="DateAdded"
                      required
                      placeholder="DateAdded"
                    />
                  </FormGroup>
                  <FormGroup className="float-right">
                    <Button className="ml-2" variant="success" type="submit">
                      Save
                    </Button>
                    <Button
                      className="ml-2"
                      variant="danger"
                      onClick={this.props.onHide}
                    >
                      Close
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddButton;
