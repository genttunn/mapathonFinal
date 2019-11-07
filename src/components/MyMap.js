import React, { Component, createRef, Fragment, useState } from "react";
import MENU_MODES from "../MenuModes";
import { Map, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { Button } from "react-bootstrap";
import MenuSlide from "./MenuSlide";
import Control from "@skyeer/react-leaflet-custom-control";
import { IoMdLocate } from "react-icons/io";
import { latLngBounds } from "leaflet";
import POI from "./POI";
import POICard from "./POICard";
import POIDetail from "./POIDetail";
import POIEdit from "./POIEdit";
import L from "leaflet";
import GPX from "leaflet-gpx";
import { AntPath, antPath } from "leaflet-ant-path";
import requestPOI from "../utils/requestPOI";

type Position = [number, number];
type Props = {|
  content: string,
  position: Position
|};

const DEFAULT_VIEWPORT = {
  center: [46.310473, 7.6397229],
  zoom: 13
};

type MarkerData = {| ...Props, key: string |};

//what we must have to have a marker
// const MyPopupMarker = ({ content, position }: Props) => (
//   <Marker
//     position={position}
//     riseOnHover
//     onMouseOver={e => {
//       e.target.openPopup();
//       (e.target);
//     }}
//   >
//     <Popup>
//       <POI content={content.poi} />
//     </Popup>
//   </Marker>
// );
//all the pin of the bdd (make a loop).
// const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
//   const items = markers
//     ? markers.map(({ key, ...props }) => <MyPopupMarker key={key} {...props} />)
//     : null;
//   return <Fragment>{items}</Fragment>;
// };

type State = {
  markers: Array<>
};
const MarkerList = props => {
  const items = props
    ? props.markers.map(marker => (
        <Marker
          key={marker.key}
          icon={marker.content.icon || null}
          position={marker.position}
          riseOnHover
        >
          <Popup>
            <POI
              key={marker.key}
              content={marker.content.poi}
              canDeletePOI={props.canDeletePOI}
              handleDeletePOI={props.handleDeletePOI}
              handleModalClose={props.handleModalClose}
              handleModalShow={props.handleModalShow}
              handleEditModalClose={props.handleEditModalClose}
              handleEditModalShow={props.handleEditModalShow}
              clickRoute={props.clickRoute}
              user={props.user}
            />
          </Popup>
        </Marker>
      ))
    : null;
  return <Fragment>{items}</Fragment>;
};
export default class MyMap extends Component<{}, State> {
  state = {
    hasLocation: false,
    currentLocation: null,
    currentPointer: null,
    myLocation: null,
    center: DEFAULT_VIEWPORT,
    zoom: 13,
    locationToAdd: null,
    modalState: false,
    modalPOI: null,
    modalEditState: false,
    modalEditPOI: null,
    mapRef: createRef(),
    onShowPopUp: false,
    itinary: []
  };

  handleMenuChange = isOpen => {
    this.props.handleMenuChange(isOpen);
  };
  // clicking on any point in map
  handleClick = e => {
    if (this.props.isAuthenticated) {
      this.setState(prevState => ({
        currentPointer: e.latlng
      }));
      this.handleAddLocation();
    }
  };
  handleSelfLocate = () => {
    const map = this.state.mapRef.current;
    if (map != null) {
      if (this.state.myLocation != null) {
        this.setState({
          center: { center: this.state.myLocation, zoom: 18 }
        });
      } else {
        const map = this.state.mapRef.current;
        if (map != null) {
          map.leafletElement.locate();
        }
      }
    }
  };
  handleShowOnMap = (lat, lng) => {
    const map = this.state.mapRef.current;
    if (map != null) {
      this.setState({
        center: { center: { lat, lng }, zoom: 18 }
      });
    }
  };
  handleLocationFound = (e: Object) => {
    let myVP = {};
    this.setState({
      hasLocation: true,
      myLocation: e.latlng,
      currentLocation: e.latlng,
      center: {
        center: e.latlng,
        zoom: 18
      }
    });
  };

  handleModalClose = () => {
    this.setState({ modalState: false });
  };

  handleModalShow = poi => {
    this.setState({ modalPOI: poi }, () => {
      this.setState({ modalState: true });
    });
  };
  handleEditModalClose = () => {
    this.setState({ modalEditState: false, modalEditPOI: null });
  };
  handleEditModalShow = poi => {
    this.setState({ modalEditPOI: poi }, () => {
      this.setState({ modalEditState: true });
    });
  };
  //Fires when moving map around
  onViewportChanged = (viewport: Viewport) => {
    this.setState({ center: viewport });
  };

  handleAddLocation = () => {
    this.setState(
      prevState => ({ locationToAdd: this.state.currentPointer }),
      () => this.props.handleChangeMode(MENU_MODES.ADD_POI)
    );
    this.props.setMenu(true);
  };

  //pass newPOI to App.js and unmount current marker
  handleForm = newPOI => {
    this.props.handleForm(newPOI);
    this.setState(prevState => ({ currentPointer: null }));
  };
  /*
// add to 347 clickRoute={this.destinationFinal} and define this.state.theMap to ref the map
  destinationFinal = (content) =>{
    if(this.state.itinary.length === 0) {
      this.state.itinary.push(this.state.currentLocation);
    }
    if(!this.state.itinary.includes(content))
      this.state.itinary.push(content);
    let response = requestPOI.getRoute(this.state.itinary);
    response.then(r => {
      if(r.route && r.route.shape && r.route.shape.shapePoints) {
        let route = [];
        let rTemp = r.route.shape.shapePoints;
        for (let i in rTemp) {
          if (rTemp[i]) {
            if (i % 2 === 0) {
              route[i / 2] = [rTemp[i]];
            } else {
              route[(i - 1) / 2].push(rTemp[i]);
            }
          }
        }
        console.log(rTemp.length);
        console.log(route);

        const path = antPath(route, {
          "delay": 2000,
          "dashArray": [
            10,
            20
          ],
          "weight": 5,
          "color": "#0000FF",
          "pulseColor": "#FFFFFF",
          "paused": false,
          "reverse": false,
          "hardwareAccelerated": true
        });
        //path.addTo(this.state.mapRef.current);
        if (this.state.oldPath)
          this.state.theMap.removeLayer(this.state.oldPath);
        this.state.theMap.addLayer(path);
        this.setState({oldPath: path});
      }
      else{
        if(this.state.itinary) {
          let index = this.state.itinary.indexOf(content);
          if(index >= 0)
            this.state.itinary.splice(index,1);
          console.log(this.state.itinary)
        }
      }
    });
  }
  // add this to POI.js
   <Button
            onClick={() => {
                props.clickRoute(props.content);
            }}
            size="sm"
            className="mr-1"
        > add to itinary </Button>
    */
  // discard Add Form, returns to DEFAULT menu view
  handleBackClick = () => {
    // this.props.toggleMenu();
    this.props.handleChangeMode(MENU_MODES.DEFAULT);
    this.setState(prevState => ({ currentPointer: null }));
  };

  render() {
    let currentLocationMarker = this.state.currentLocation ? (
      <Marker
        icon={
          new L.Icon({
            iconUrl: require("../assets/me-marker.png"),
            iconAnchor: [18, 40],
            popupAnchor: [0, -35],
            iconSize: [36, 40]
          })
        }
        position={this.state.currentLocation}
        onMouseOver={e => {
          e.target.openPopup();
        }}
      >
        <Popup>{"You are here"}</Popup>
      </Marker>
    ) : null;
    let currentPointerMarker =
      this.state.currentPointer != null ? (
        <Marker
          position={this.state.currentPointer}
          draggable={true}
          autoPan={true}
          onMouseOver={e => {}}
          icon={
            new L.Icon({
              iconUrl: require("../assets/add-marker.png"),
              iconAnchor: [13, 40],
              popupAnchor: [0, -35],
              iconSize: [26, 40]
            })
          }
        >
          <Popup>
            <Button variant="primary" onClick={this.handleAddLocation}>
              Add location
            </Button>
          </Popup>
        </Marker>
      ) : null;
    return (
      <div>
        <MenuSlide
          isOpen={this.props.menuState}
          menuMode={this.props.menuMode}
          toggleMenu={this.props.toggleMenu}
          handleMenuChange={this.handleMenuChange}
          locationToAdd={this.state.locationToAdd}
          categories={this.props.categories}
          handleForm={this.handleForm}
          changeMode={this.props.handleChangeMode}
          handleBackClick={this.handleBackClick}
          markers={this.props.markers}
          handleFilterGroup={this.props.handleFilterGroup}
          handleFilterUser={this.props.handleFilterUser}
          canDeletePOI={this.props.canDeletePOI}
          handleDeletePOI={this.props.handleDeletePOI}
          handleShowOnMap={this.handleShowOnMap}
          handleModalClose={this.handleModalClose}
          handleModalShow={this.handleModalShow}
          handleEditModalClose={this.handleEditModalClose}
          handleEditModalShow={this.handleEditModalShow}
          handleLikePOI={this.props.handleLikePOI}
          handleUnlikePOI={this.props.handleUnlikePOI}
        />
        <Map
          viewport={this.state.center}
          onViewportChanged={this.onViewportChanged}
          onLocationfound={this.handleLocationFound}
          zoom={this.state.zoom}
          ref={this.state.mapRef}
          onDblClick={this.handleClick}
          doubleClickZoom={false}
          zoomControl={true}
          onMove={e => {
            e.target.closePopup();
          }}
        >
          <TileLayer
            maxZoom={19 /* we need both to work*/}
            minZoom={1}
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Control position="topleft">
            <Button variant="primary" onClick={this.handleSelfLocate}>
              <div style={{ color: "white" }}>
                <IoMdLocate size={24} />
              </div>
            </Button>
          </Control>
          {currentLocationMarker}
          {currentPointerMarker}
          <MarkerList
            markers={this.props.markers}
            canDeletePOI={this.props.canDeletePOI}
            handleDeletePOI={this.props.handleDeletePOI}
            handleShowOnMap={this.handleShowOnMap}
            handleModalClose={this.handleModalClose}
            handleModalShow={this.handleModalShow}
            handleEditModalClose={this.handleEditModalClose}
            handleEditModalShow={this.handleEditModalShow}
            user={this.props.user}
          />
          {this.state.modalPOI ? (
            <POIDetail
              modalState={this.state.modalState}
              modalPOI={this.state.modalPOI}
              handleModalClose={this.handleModalClose}
              handleModalShow={this.handleModalShow}
            />
          ) : null}
          {this.state.modalEditPOI ? (
            <POIEdit
              modalEditState={this.state.modalEditState}
              modalEditPOI={this.state.modalEditPOI}
              handleEditModalClose={this.handleEditModalClose}
              handleEditModalShow={this.handleEditModalShow}
              handleEditForm={this.props.handleEditForm}
              categories={this.props.categories}
            />
          ) : null}
        </Map>
      </div>
    );
  }
}
