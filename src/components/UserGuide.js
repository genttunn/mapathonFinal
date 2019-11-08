import React, { Component } from "react";
import {
  IoMdLocate,
  IoMdDownload,
  IoIosLogOut,
  IoIosLogIn,
  IoIosInformationCircleOutline,
  IoMdWallet
} from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { Button, Row } from "react-bootstrap";

class UserGuide extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2 className="text-center">Quick Guide </h2>
        <br />
        <div as={Row}>
          <Button variant="success" className="mr-3">
            <div style={{ color: "white" }}>
              <IoIosLogIn size={24} />
            </div>
          </Button>
          Login to interact with POIs
        </div>
        <br />
        <div as={Row}>
          <Button variant="warning" className="mr-3">
            <IoMdDownload size={24} />
          </Button>
          Retrieve/Refresh & Display POIs
        </div>
        <br />
        <div as={Row}>
          <Button variant="secondary" className="mr-3">
            <IoMdWallet size={24} />
          </Button>
          Add new Category
        </div>
        <br />
        <div as={Row}>
          <Button variant="primary" className="mr-3">
            <div style={{ color: "white" }}>
              <IoMdLocate size={24} />
            </div>
          </Button>
          Display current location/Recenter
        </div>
        <br />

        <div as={Row}>
          <Button variant="danger" className="mr-3">
            <div style={{ color: "white" }}>
              <IoIosLogOut size={24} />
            </div>
          </Button>
          Logout
        </div>
        <br />
        <div as={Row}>
          <Button variant="success" className="mr-3">
            <IoIosInformationCircleOutline size={24} />
          </Button>
          See POI Details
        </div>
        <br />
        <div as={Row}>
          <Button variant="outline-success" className="mr-3">
            <MdFilterList size={24} style={{ color: "green" }} />
          </Button>
          Filter POIs
        </div>
        <br />
        <div as={Row}>
          <Button variant="success">
            Manage your POIs{" "}
            <MdFilterList size={24} style={{ color: "white" }} />
          </Button>
        </div>
        <br />
        <div as={Row}>
          * Can only delete/edit your own POIs. Click on Manage your POIs to
          start. Redirects to list of all POIs.
        </div>
        <br />
        <div as={Row}>
          <Button variant="primary">Add location</Button>
        </div>
        <br />

        <div as={Row}>* To add a POI, double click on the map.</div>
      </div>
    );
  }
}

export default UserGuide;
