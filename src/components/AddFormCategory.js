import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
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
      newCategory : {
        name: "",
        image: null,
        group: 2
      }
    };
  }


  inputFieldValueChanged = event => {
    this.setState({
      newCategory: {
        ...this.state.newCategory,
        [event.target.id]: event.target.value
      }
    });
  };

  addCategoryButtonClicked = event => {
    event.preventDefault();
    this.setState(
      prevState => ({
        newCategory: {
          name: this.state.newCategory.name,
          image: this.state.newCategory.image,
          group: this.state.newCategory.group
        }
      }),
      data => this.props.handleForm(this.state.newCategory)
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
            Image:
            <input
              id="image"
              type="URL"
              onChange={this.inputFieldValueChanged}
              className="form-control"
            />
            <br />
            <p></p>
            <input
              className="btn btn-info"
              type="submit"
              onClick={this.addCategoryButtonClicked}
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
export default AddFormCategory;
