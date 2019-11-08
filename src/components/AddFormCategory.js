import React, { Component } from "react";
import { Button } from "react-bootstrap";

class AddFormCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newCategory : {
        name: "",
        image: null,
        group: 0
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
      data => {this.props.handleFormCat(this.state.newCategory)}
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
            <p className="h4 text-center mb-4"> Add Category </p>
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
              Group:
              <input
                  id="group"
                  type="URL"
                  onChange={this.inputFieldValueChanged}
                  className="form-control"
              />
              <br />
              <p></p>
              <div style={{display:"flex"}}>
                  <Button
                      onClick={this.backButtonClicked}
                      variant="danger"
                      style={{ display: "block", margin: "0 auto" }}>
                      Go back
                  </Button>
                  <input
                      className="btn btn-info"
                      type="submit"
                      onClick={this.addCategoryButtonClicked}
                      value="Submit"
                      style={{ display: "block", margin: "0 auto" }}
                  />
              </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default AddFormCategory;
