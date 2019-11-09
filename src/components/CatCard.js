import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { IoIosTrash } from "react-icons/io";
class CatCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Card style={{ width: "100%", margin: "0 auto" }}>
          <Card.Body>
            <Card.Title>
              <img
                src={this.props.categories.image}
                style={{ width: 30, height: 30 }}
                alt=""
              />{" "}
              {this.props.categories.name}
            </Card.Title>
            <Card.Text>
              Creator : {this.props.categories.Creator.email}{" "}
            </Card.Text>{" "}
            <Card.Text>Group : {this.props.categories.group}</Card.Text>
            {this.props.user.email === this.props.categories.Creator.email ? (
              <Button
                variant="danger"
                className="mr-sm-2 float-right"
                size="sm"
                onClick={() =>
                  this.props.deleteCategory(this.props.categories.id)
                }
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

export default CatCard;
