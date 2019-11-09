import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { IoIosTrash } from "react-icons/io";
class TagCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Card style={{ width: "100%", margin: "0 auto" }}>
          <Card.Body>
            <Card.Title>
              <img
                className="category-image"
                src={this.props.tag.image}
                alt=""
                style={{ width: 24, height: 24, marginRight: 3 }}
              />
              <span
                style={{
                  backgroundColor: this.props.tag.color,
                  borderRadius: "10px",
                  color: "black",
                  padding: "0.25em"
                }}
              >
                <small>{this.props.tag.name}</small>
              </span>
            </Card.Title>
            <Card.Text>Creator : {this.props.tag.Creator.email} </Card.Text>{" "}
            <Card.Text>Group : {this.props.tag.group}</Card.Text>
            {this.props.user.email === this.props.tag.Creator.email ? (
              <Button
                variant="danger"
                className="mr-sm-2 float-right"
                size="sm"
                onClick={() => this.props.handleDeleteTag(this.props.tag.id)}
              >
                <IoIosTrash size={24} />
              </Button>
            ) : null}
          </Card.Body>
        </Card>
        <div id="correctionUI" style={{ height: "15px" }}></div>
      </React.Fragment>
    );
  }
}

export default TagCard;
