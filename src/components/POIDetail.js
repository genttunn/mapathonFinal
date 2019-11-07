import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import blank from "../assets/blank.png";
class POIDetail extends Component {
  state = {};
  handleDetailClick = state => {
    this.props.handleDetailClick(state);
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
    } = this.props.modalPOI;
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
        show={this.props.modalState}
        onHide={this.props.handleModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <a href={url}>{name}</a>
            {Status && (
              <span className="ml-2" style={{ color: statusColor }}>
                <small>{Status.name}</small>
              </span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Categories && Categories.length > 0 && (
            <div>
              {Categories.map(category => (
                <span key={category.id} className="mr-1">
                  {category.image && (
                    <img
                      src={category.image}
                      style={{ width: 24, height: 24 }}
                    />
                  )}
                  <small> {category.name}</small>
                </span>
              ))}
              <br />
            </div>
          )}

          <img className="img-fluid" alt={name} src={image} />
          <br />
          <br />
          <p>
            <strong>Description :</strong> {description}
          </p>
          <p>
            <strong>Position :</strong> {lat} , {lng}
          </p>
          <p>
            <strong>URL :</strong> <a href={url}>{url}</a>
          </p>
          <p>
            <strong>Group :</strong> {group}
          </p>
          <p>
            <strong>Creator :</strong> {Creator.name}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.props.handleModalClose()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default POIDetail;
