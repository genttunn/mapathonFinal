import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./AddForm.css";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import MENU_MODES from "../MenuModes";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
class POIEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poiId: this.props.modalEditPOI.id,
      Category: this.props.categories || [],
      myCategory: [],
      newPOI: {}
    };
  }

  inputFieldValueChanged = event => {
    this.setState({
      newPOI: {
        ...this.state.newPOI,
        [event.target.id]: event.target.value
      }
    });
    console.log(this.state.newPOI);
  };
  editPOIButtonClicked = event => {
    event.preventDefault();
    let newContent = {
      poiId: this.props.modalEditPOI.id,
      newPOI: this.state.newPOI
    };
    console.log(this.state.myCategory);
    this.props.handleEditForm(newContent);
    this.refs.form.reset();
    this.props.handleEditModalClose();
  };
  handleChange = event => {
    this.setState(
      {
        myCategory: event.target.value
      },
      () => {
        this.setState({
          newPOI: {
            ...this.state.newPOI,
            categories: this.state.myCategory
          }
        });
      }
    );
  };
  render() {
    const {
      id,
      name,
      description,
      lat,
      lng,
      image,
      url,
      group,
      createAt,
      Categories,
      Creator,
      Status
    } = this.props.modalEditPOI;
    let statusColor;
    if (Status) {
      switch (Status.id) {
        case 1:
          statusColor = "red";
          break;
        case 2:
          statusColor = "orange";
          break;
        case 3:
          statusColor = "green";
          break;
      }
    }

    return (
      <Modal
        show={this.props.modalEditState}
        onHide={this.props.handleEditModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title> Edit {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <React.Fragment>
            <div>
              <form ref="form">
                Name:{" "}
                <input
                  id="name"
                  type="text"
                  placeholder={name}
                  onChange={this.inputFieldValueChanged}
                  className="form-control"
                />
                <br />
                Categories :{" "}
                <FormControl className="formControl">
                  <Select
                    labelWidth={"200px"}
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={this.state.myCategory}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                      <div className="chips">
                        {selected.map(cat => (
                          <Chip
                            key={cat.id}
                            label={cat.name}
                            className="chip"
                          />
                        ))}
                      </div>
                    )}
                  >
                    {this.state.Category.map(cat => (
                      <MenuItem key={cat.id} value={cat}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                Group:{" "}
                <input
                  id="group"
                  type="number"
                  placeholder={group}
                  onChange={this.inputFieldValueChanged}
                  className="form-control"
                />
                <br />
                Image:
                <input
                  id="image"
                  type="URL"
                  placeholder={image}
                  onChange={this.inputFieldValueChanged}
                  className="form-control"
                />
                <br />
                URL:{" "}
                <input
                  id="url"
                  type="URL"
                  placeholder={url}
                  onChange={this.inputFieldValueChanged}
                  className="form-control"
                />
                <br />
                Description:{" "}
                <textarea
                  id="description"
                  type="text"
                  onChange={this.inputFieldValueChanged}
                  rows="3"
                  placeholder={description}
                  className="form-control"
                />
                <br />
                <div style={{ display: "flex" }}>
                  <input
                    className="btn btn-info"
                    type="submit"
                    onClick={this.editPOIButtonClicked}
                    value="Submit"
                    style={{ display: "block", margin: "0 auto" }}
                  />
                </div>
              </form>
            </div>
          </React.Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.props.handleEditModalClose()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default POIEdit;
