import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import './AddForm.css'
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import MENU_MODES from "../MenuModes";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";


class AddForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Category: this.props.categories || [],
      myCategory : [],
      newPOI: {
        name: "",
        description: "",
        group: 0,
        image: "",
        url: "",
        lat:
          this.props.locationToAdd == null ? 0 : this.props.locationToAdd.lat,
        lng: this.props.locationToAdd == null ? 0 : this.props.locationToAdd.lng
      }
    };
  }


  inputFieldValueChanged = event => {
    this.setState({
      newPOI: {
        ...this.state.newPOI,
        [event.target.id]: event.target.value
      }
    });
  };

  addPOIButtonClicked = event => {
    event.preventDefault();
    this.setState(
      prevState => ({
        newPOI: {
          name: this.state.newPOI.name,
          description: this.state.newPOI.description,
          group: this.state.newPOI.group,
          image: this.state.newPOI.image,
          url: this.state.newPOI.url,
          lat: this.props.locationToAdd.lat,
          lng: this.props.locationToAdd.lng,
          categories : this.state.myCategory
        }
      }),
      data => this.props.handleForm(this.state.newPOI)
    );
    this.refs.form.reset();
  };
  backButtonClicked = event => {
    event.preventDefault();
    this.props.handleBackClick();
  };

  handleChange = event => {
    this.setState({
      myCategory:event.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <form ref="form">
            <p className="h4 text-center mb-4"> Add POI </p>
            Name:{" "}
            <input
              id="name"
              type="text"
              onChange={this.inputFieldValueChanged}
              className="form-control"
            />
            <br />
            Categories :{" "}
            <FormControl className="formControl">
              <Select labelWidth={'200px'}
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={this.state.myCategory}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                      <div className="chips">
                        {selected.map(cat => (
                            <Chip key={cat.id} label={cat.name} className="chip" />
                        ))}
                      </div>
                  )}
              >
                {this.state.Category.map(cat => (
                    <MenuItem key={cat.id} value={cat} >
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
              onChange={this.inputFieldValueChanged}
              className="form-control"
            />
            <br />
            Image:
            <input
              id="image"
              type="URL"
              onChange={this.inputFieldValueChanged}
              className="form-control"
            />
            <br />
            URL:{" "}
            <input
              id="url"
              type="URL"
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
              className="form-control"
            />
            <br />
            <p></p>
            <input
              className="btn btn-info"
              type="submit"
              onClick={this.addPOIButtonClicked}
              value="Submit"
              style={{ display: "block", margin: "0 auto" }}
            />
            <br />
            <Button
              onClick={this.backButtonClicked}
              variant="danger"
              style={{ display: "block", margin: "0 auto" }}
            >
              Go back
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddForm;
