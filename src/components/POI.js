import React from "react";
import "./POI.css";
import { IoIosTrash, IoIosInformationCircleOutline } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { Button, Row } from "react-bootstrap";

export default function POI(props) {
  const { name, description, lat, lng, image, url } = props.content;
  const { Categories, Tags, User, Status } = props.content;
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
    <div className="poi" style={{ borderColor: statusColor }}>
      {/* {Status && (
        <span className="status" style={{ color: statusColor }}>
          <small>{Status.name}</small>
        </span>
      )} */}
      {Categories && Categories.length > 0 && (
        <div className="categories">
          {Categories.map(category => (
            <span className="category" key={category.id}>
              {category.image && (
                <img
                  className="category-image"
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
      <h4>
        {url ? (
          <a href={url} target="_blank" className="App-link">
            {name}
          </a>
        ) : (
          <span>{name}</span>
        )}
      </h4>
      <br />
      {image && (
        <img
          className="img-fluid"
          alt={name}
          src={image}
          style={{ width: "100%" }}
        />
      )}
      <br />
      <br />
        <section>{description.length > 300 ? description.slice(0,300)+" (...)":description}</section>
      <br />
      {Tags && Tags.length > 0 && (
        <>
          <hr />
          <div className="categories">
            {Tags.map(tag => (
              <span
                className="category tag"
                style={{ backgroundColor: tag.color }}
                key={tag.id}
              >
                {tag.image && (
                  <img className="category-image" src={tag.image} />
                )}
                <small>{tag.name}</small>
              </span>
            ))}
          </div>
        </>
      )}
      <div as={Row}>
        {/* <Button variant="success" size="sm" className="mr-sm-1">
          <IoIosInformationCircleOutline
            size={17}
            onClick={() => {
              props.handleModalShow(props.content);
            }}
          />
        </Button> */}

        <span className="mr-sm-1" style={{ color: "dodgerblue" }}>
          <a
            href="#"
            onClick={() => {
              props.handleModalShow(props.content);
            }}
          >
            Details
          </a>
        </span>
        <br />
        <br />
        {props.canDeletePOI && (
          <div>
            <Button
              variant="danger"
              onClick={() => props.handleDeletePOI(props.content.id)}
              size="sm"
              className="mr-1"
            >
              <IoIosTrash size={17} />
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                props.handleEditModalShow(props.content);
              }}
              size="sm"
              className="mr-1"
            >
              <MdModeEdit size={17} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
