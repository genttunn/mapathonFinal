import React from "react";
import InputColor from "react-input-color";
import { Button, Row } from "react-bootstrap";
function AddFormTag(props) {
  const [color, setColor] = React.useState({});
  const [name, setName] = React.useState({});
  const [image, setImage] = React.useState({});
  const [group, setGroup] = React.useState({});
  let handleAddTag = () => {
    const newTag = {
      group: group,
      name: name,
      color: color.hex,
      image: image
    };
    props.handleFormTag(newTag);
  };
  let addTagButtonClicked = event => {
    event.preventDefault();
    handleAddTag();
  };
  return (
    <div>
      <form id="form">
        <p className="h4 text-center mb-4"> Add Tag </p>
        <div as={Row}>
          {" "}
          Color:
          <InputColor
            initialHexColor="#00c71e"
            onChange={setColor}
            placement="right"
            className="ml-3"
          />
        </div>
        <br />
        Name:{" "}
        <input
          id="name"
          type="text"
          className="form-control"
          onChange={e => setName(e.target.value)}
          required
        />
        <br />
        Image:
        <input
          id="image"
          type="URL"
          className="form-control"
          onChange={e => setImage(e.target.value)}
        />
        <br />
        Group:
        <input
          id="group"
          type="number"
          className="form-control"
          onChange={e => setGroup(e.target.value)}
          required
        />
        <br />
        <p></p>
        <div style={{ display: "flex" }}>
          <Button
            variant="danger"
            style={{ display: "block", margin: "0 auto" }}
            onClick={props.handleBackClick}
          >
            Go back
          </Button>
          <input
            className="btn btn-info"
            onClick={addTagButtonClicked}
            value="Submit"
            type="submit"
            style={{ display: "block", margin: "0 auto" }}
          />
        </div>
      </form>
    </div>
  );
}

export default AddFormTag;
