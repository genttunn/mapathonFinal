import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import AddForm from "./AddForm";
import MENU_MODES from "../MenuModes";
import POIDisplay from "./POIDisplay";
import UserGuide from "./UserGuide";
class MenuSlide extends Component {
  state = {};
  handleMenuChange = state => {
    this.props.handleMenuChange(state.isOpen);
  };
  renderMenuContent = menuMode => {
    switch (menuMode) {
      case MENU_MODES.DEFAULT:
        return (
          <POIDisplay
            markers={this.props.markers}
            group={2}
            handleFilterGroup={this.props.handleFilterGroup}
            handleFilterUser={this.props.handleFilterUser}
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
        );
        break;
      case MENU_MODES.USER_GUIDE:
        return <UserGuide />;
        break;
      case MENU_MODES.ADD_POI:
        return (
          <div>
            <AddForm
              locationToAdd={this.props.locationToAdd}
              handleForm={this.props.handleForm}
              handleBackClick={this.props.handleBackClick}
              categories={this.props.categories}
            />
          </div>
        );
      default:
        return <UserGuide />;
    }
  };
  render() {
    return (
      <Menu
        styles={burgerStyles}
        right
        isOpen={this.props.isOpen}
        onStateChange={this.handleMenuChange}
        noOverlay
      >
        <div>{this.renderMenuContent(this.props.menuMode)}</div>
      </Menu>
    );
  }
}

export default MenuSlide;

var burgerStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "100px",
    top: "36px"
  },
  bmBurgerBars: {
    background: "none",
    display: "none",
    visibility: "hidden"
  },
  bmBurgerBarsHover: {
    background: "#a90000"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenuWrap: {
    position: "fixed",
    width: "25%",
    height: "100%"
  },
  bmMenu: {
    background: "#FFFFFF",
    padding: "2.5em 1em 0",
    fontSize: "15px",
    fontWeight: "bold"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#373a47",
    padding: "0.8em"
  },
  bmItem: {
    outline: "none",
    display: "block",
    textAlign: "left"
  },
  bmOverlay: {
    background: "none"
  }
};
