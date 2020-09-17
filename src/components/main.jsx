import React, { Component } from "react";
import "./main.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddButton from "./AddButton";
import EditButton from "./EditButton";
import ShowAnn from "./ShowAnn";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anns: [],
      addModalShow: false,
      editModalShow: false,
      showModalShow: false,
    };
  }

  loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://localhost:5001/api/Announcement", true);
    xhr.onload = function () {
      var data = JSON.parse(xhr.responseText);
      this.setState({ anns: data });
    }.bind(this);
    xhr.send();
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  deleteAnn(annId) {
    if (window.confirm("Are you sure?")) {
      var xhr = new XMLHttpRequest();

      xhr.open(
        "delete",
        "https://localhost:5001/api/Announcement/" + annId,
        true
      );
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();
    }
  }

  findSimilar(text1, text2) {
    var t1 = text1.replace(/[^a-zA-Z0-9-. ]/g, "").split(" ");
    var t2 = text2.replace(/[^a-zA-Z0-9-. ]/g, "").split(" ");

    for (var i = 0; i < t1.length; i++) {
      for (var j = 0; j < t2.length; j++) {
        if (t1[i] === "") continue;
        if (t1[i] === t2[j]) return true;
      }
    }
    return false;
  }

  handleFindTop(ann) {
    const { anns } = this.state;
    var similarAnns = [];

    for (var i = 0; i < anns.length; i++) {
      if (ann.id === anns[i].id) continue;
      if (
        this.findSimilar(ann.title, anns[i].title) &&
        this.findSimilar(ann.description, anns[i].description)
      ) {
        similarAnns.push(anns[i]);
        if (similarAnns.length >= 3) break;
      }
    }

    if (similarAnns.length < 3) {
      for (var i = similarAnns.length; i < 3; i++) {
        similarAnns.push(0);
        console.log(similarAnns.length);
        console.log(similarAnns[i]);
      }
    }

    return similarAnns;
  }

  render() {
    const {
      anns,
      id,
      title,
      description,
      dateAdded,
      similar1,
      similar2,
      similar3,
    } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    let showModalClose = () => this.setState({ showModalShow: false });

    return (
      <div style={{ width: "1100px" }}>
        <div className="tableFixHead">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr className="d-flex">
                <th width="200px">Title</th>
                <th width="500px">Description</th>
                <th width="180px">Date Added</th>
                <th width="200px">...</th>
              </tr>
            </thead>
            <tbody display="table">
              {anns.map((ann) => (
                <tr key={ann.id} className="d-inline-block float-left ">
                  <td
                    className=" align-middle cell"
                    style={{
                      width: "200px",
                    }}
                  >
                    {ann.title}
                  </td>
                  <td
                    className=" align-middle cell"
                    style={{
                      width: "500px",
                    }}
                  >
                    {ann.description}
                  </td>
                  <td
                    className=" align-middle cell"
                    style={{
                      width: "180px",
                    }}
                  >
                    {new Date(ann.dateAdded).toLocaleDateString("en-UK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td
                    className=" align-middle cell"
                    style={{
                      width: "200px",
                    }}
                  >
                    <ButtonToolbar className="d-flex justify-content-center">
                      <Button
                        className="m-1"
                        variant="primary"
                        onClick={() =>
                          this.setState({
                            showModalShow: true,
                            id: ann.id,
                            title: ann.title,
                            description: ann.description,
                            dateAdded: ann.dateAdded,
                            similar1: this.handleFindTop(ann)[0].title,
                            similar2: this.handleFindTop(ann)[1].title,
                            similar3: this.handleFindTop(ann)[2].title,
                          })
                        }
                      >
                        <VisibilityIcon />
                      </Button>
                      <Button
                        className="m-1"
                        variant="info"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            id: ann.id,
                            title: ann.title,
                            description: ann.description,
                            dateAdded: ann.dateAdded,
                          })
                        }
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        className="m-1"
                        variant="info"
                        onClick={() => this.deleteAnn(ann.id)}
                        variant="danger"
                      >
                        <DeleteIcon />
                      </Button>
                      <EditButton
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        id={id}
                        title={title}
                        description={description}
                        dateAdded={dateAdded}
                      />
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Button
          variant="success"
          onClick={() => this.setState({ addModalShow: true })}
          className="float-right mt-4"
        >
          New announcement
        </Button>
        <AddButton
          show={this.state.addModalShow}
          onHide={addModalClose}
        ></AddButton>
        <ShowAnn
          show={this.state.showModalShow}
          onHide={showModalClose}
          id={id}
          title={title}
          description={description}
          dateAdded={dateAdded}
          similar1={similar1}
          similar2={similar2}
          similar3={similar3}
        />
      </div>
    );
  }
}

export default Main;
