import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./AddForm.css";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Category: this.props.categories || [],
      myCategory: [],
      Tag: this.props.tags || [],
      myTag: [],
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
          categories: this.state.myCategory,
          tags: this.state.myTag
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

  handleCatChange = event => {
    this.setState({
      myCategory: event.target.value
    });
  };
  handleTagChange = event => {
    this.setState({
      myTag: event.target.value
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
              <Select
                labelWidth={"200px"}
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={this.state.myCategory}
                onChange={this.handleCatChange}
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
                  <MenuItem key={cat.id} value={cat}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            Tags :{" "}
            <FormControl className="formControl">
              <Select
                labelWidth={"200px"}
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={this.state.myTag}
                onChange={this.handleTagChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className="chips">
                    {selected.map(tag => (
                      <Chip key={tag.id} label={tag.name} className="chip" />
                    ))}
                  </div>
                )}
              >
                {this.state.Tag.map(tag => (
                  <MenuItem
                    key={tag.id}
                    value={tag}
                    style={{ overflow: "hidden", maxWidth: 200 }}
                  >
                    <span
                      style={{
                        backgroundColor: tag.color,
                        borderRadius: "10px",
                        color: "black",
                        padding: "0.25em"
                      }}
                    >
                      <small>{tag.name}</small>
                    </span>
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
            <div style={{ display: "flex" }}>
              <Button
                onClick={this.backButtonClicked}
                variant="danger"
                style={{ display: "block", margin: "0 auto" }}
              >
                Go back
              </Button>
              <input
                className="btn btn-info"
                type="submit"
                onClick={this.addPOIButtonClicked}
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

export default AddForm;

//  <FormControl className="formControl">
//               <Select
//                 labelWidth={"200px"}
//                 labelId="demo-mutiple-chip-label"
//                 id="demo-mutiple-chip"
//                 multiple
//                 value={this.state.Tag}
//                 onChange={this.handleChange}
//                 input={<Input id="select-multiple-chip" />}
//                 renderValue={selected => (
//                   <div className="chips">
//                     {selected.map(tag => (
//                       <Chip key={tag.id} label={tag.name} className="chip" />
//                     ))}
//                   </div>
//                 )}
//               >
//                 {this.state.Tag.map(tag => (
//                   <MenuItem key={tag.id} value={tag}>
//                     {tag.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
