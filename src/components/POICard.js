import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import {
  IoMdLocate,
  IoIosTrash,
  IoIosInformationCircleOutline,
  IoIosHeart,
  IoIosHeartEmpty
} from "react-icons/io";

export default function POICard(props) {
  const {
    id,
    name,
    description,
    lat,
    lng,
    image,
    url,
    liked,
    likes
  } = props.content;
  const { Categories, Creator, Status } = props.content;
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
    <Col>
      <Card style={{ width: "22rem" }}>
        <Card.Img className="img-fluid" src={image} />

        <Card.Body>
          {Categories && Categories.length > 0 && (
            <div className="mr-sm-2">
              {Categories.map(category => (
                <span key={category.id}>
                  {category.image && (
                    <img
                      src={category.image}
                      style={{ width: 24, height: 24 }}
                    />
                  )}
                  <small> {category.name}</small>
                </span>
              ))}
            </div>
          )}
          <br />
          <Card.Title>
            <a href={url}>{name} </a>
            {Status && (
              <span className="status" style={{ color: statusColor }}>
                <small>{Status.name}</small>
              </span>
            )}
          </Card.Title>
          <Card.Text>{description} </Card.Text>
          <Button variant="success" className="mr-sm-2 float-right" size="sm">
            <IoIosInformationCircleOutline
              size={24}
              onClick={() => {
                props.handleModalShow(props.content);
              }}
            />
          </Button>
          <Button
            variant="primary"
            className="mr-sm-2 float-right"
            onClick={() => props.handleShowOnMap(lat, lng)}
            size="sm"
          >
            <IoMdLocate size={24} />
          </Button>

          {props.canDeletePOI && (
            <span>
              <Button
                variant="danger"
                className="mr-sm-2 float-right"
                onClick={() => props.handleDeletePOI(id)}
                size="sm"
              >
                <IoIosTrash size={24} />
              </Button>
              <Button
                variant="warning"
                className="mr-sm-2 float-right"
                size="sm"
              >
                <MdModeEdit
                  size={24}
                  onClick={() => {
                    props.handleEditModalShow(props.content);
                  }}
                />
              </Button>
            </span>
          )}
          <div style={{ color: "#cc4545" }}>
            {likes}
            {liked ? (
              <IoIosHeart
                size={24}
                className="mr-sm-1 float-left"
                onClick={() => props.handleUnlikePOI(id)}
              />
            ) : (
              <IoIosHeartEmpty
                size={24}
                className="mr-sm-1 float-left"
                onClick={() => props.handleLikePOI(id)}
              />
            )}
          </div>
        </Card.Body>
      </Card>
      <br />
    </Col>
  );
}
