import React, { Component } from "react";
import POI from "./POI";
import { Form, Button, Row, Col } from "react-bootstrap";
import { MdFilterList } from "react-icons/md";
import POICard from "./POICard";
import UserGuide from "./UserGuide";
class POIDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { group: 0 };
  }
  handleRadio = group => {
    this.setState(prevState => ({ group: group }));
  };
  handleFilterGroup = () => {
    this.props.handleFilterGroup(this.state.group);
  };
  render() {
    const POIDisplayList = this.props.markers
      // .filter(poi => poi.content.poi.group == this.props.group)
      .map(poi => (
        <POICard
          key={poi.key}
          content={poi.content.poi}
          canDeletePOI={this.props.canDeletePOI}
          handleDeletePOI={this.props.handleDeletePOI}
          handleShowOnMap={this.props.handleShowOnMap}
          handleModalClose={this.props.handleModalClose}
          handleModalShow={this.props.handleModalShow}
          handleEditModalClose={this.props.handleEditModalClose}
          handleEditModalShow={this.props.handleEditModalShow}
          handleLikePOI={this.props.handleLikePOI}
          handleUnlikePOI={this.props.handleUnlikePOI}
        />
      ));

    return (
      <div>
        {this.props.markers == 0 ? (
          <UserGuide />
        ) : (
          <div>
            <Form className="text-center">
              <fieldset>
                <Form.Label as="legend" className="ml-1">
                  <h3>Filter </h3>
                </Form.Label>
                <br />
                <Form.Label as="legend" className="ml-1">
                  Filter by Group
                </Form.Label>
                <Form.Group
                  className="mr-2"
                  style={{ border: 1, borderColor: "black" }}
                >
                  <Form.Check
                    inline
                    className="mr-sm-1"
                    type="radio"
                    label="0"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onClick={() => this.handleRadio(0)}
                  />
                  <Form.Check
                    inline
                    className="mr-sm-1"
                    type="radio"
                    label="1"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onClick={() => this.handleRadio(1)}
                  />
                  <Form.Check
                    inline
                    className="mr-sm-1"
                    type="radio"
                    label="2"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    onClick={() => this.handleRadio(2)}
                  />
                  <Form.Check
                    inline
                    className="mr-sm-1"
                    type="radio"
                    label="3"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    onClick={() => this.handleRadio(3)}
                  />
                  <Form.Check
                    inline
                    className="mr-sm-1"
                    type="radio"
                    label="4"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios4"
                    onClick={() => this.handleRadio(4)}
                  />
                  <MdFilterList
                    size={28}
                    style={{ color: "green" }}
                    onClick={this.handleFilterGroup}
                  />
                </Form.Group>
              </fieldset>

              <fieldset>
                {" "}
                <Form.Label as="legend" className="ml-1">
                  <Button
                    variant="success"
                    onClick={this.props.handleFilterUser}
                  >
                    Manage your POIs{" "}
                    <MdFilterList
                      size={24}
                      style={{ color: "white" }}
                      className="ml-2 float-right"
                    />
                  </Button>
                </Form.Label>
              </fieldset>
            </Form>{" "}
            <br />
            {POIDisplayList}
          </div>
        )}
      </div>
    );
  }
}

export default POIDisplay;
