import React, { useState, useEffect } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";
import request from "./utils/request";
import requestPOI from "./utils/requestPOI";
import endpoints from "./endpoints";
import Loading from "./components/Loading";
import MyMap from "./components/MyMap";
import NavigationBar from "./components/NavigationBar";
import MENU_MODES from "./MenuModes";
import L from "leaflet";

function App() {
  let [pois, setPois] = useState([]);
  let [categories, setCategories] = useState([]);
  let [markers, setMarkers] = useState([]);
  let [prevMarkers, setPrevMarkers] = useState([]);
  let [canDeletePOI, setCanDeletePOI] = useState(false);
  let {
    user,
    loading,
    loginWithPopup,
    getTokenSilently,
    logout,
    isAuthenticated
  } = useAuth0();
  //component stock states : open/closed
  let [menuState, setMenuState] = useState(true);
  //Menu modes: DEFAULT displays POI list, ADD_POI opens add form
  let [menuMode, setMenuMode] = useState(MENU_MODES.DEFAULT);
  let [loadingMarkers, setLoaddingMarkers] = useState(false);

  let handleLogin = async e => {
    e.preventDefault();
    try {
      await handleGetPOI();
    } catch (e) {
      await loginWithPopup();
    }
  };
  // useEffect(() => {
  //   handleGetPOI();
  // }, [isAuthenticated]);

  let handleLogout = () => {
    logout();
    setPois([]);
  };
  let toggleMenu = () => {
    setMenuState(!menuState);
  };
  let setMenu = isOpen => {
    setMenuState(isOpen);
  };
  let handleOpenGuide = () => {
    setMenuMode(MENU_MODES.USER_GUIDE);
    setMenu(true);
  };
  let handleGetPOI = async () => {
    let pois = await requestPOI.getAllPOI(getTokenSilently, loginWithPopup);
    setPois(pois);
    let markers = [];
    for (let i in pois) {
      let poi = pois[i];
      let icTemp = {
        size: [26, 40],
        url: require("./assets/default-marker.png")
      };
      if (poi.Categories && poi.Categories[0] && poi.Categories[0].image) {
        icTemp.size = [36, 40];
        icTemp.url = poi.Categories[0].image;
      }
      let icon = new L.Icon({
        iconUrl: icTemp.url,
        iconAnchor: [icTemp.size[0] / 2, icTemp.size[1]],
        popupAnchor: [0, 0 - (icTemp.size[1] - 5)],
        iconSize: icTemp.size
      });

      //initialisation for the pin with the content.
      markers.push({
        key: poi.id,
        position: [poi.lat, poi.lng],
        content: {
          name: poi.name,
          description: poi.description,
          poi: poi,
          icon: icon
        }
      });
    }
    // update all the marker in state
    setMenuMode(MENU_MODES.DEFAULT);
    // If user mode is on, filter only the user POIS
    if (canDeletePOI) {
      let filteredMarkers = markers.filter(
        markers => markers.content.poi.Creator.email == user.email
      );
      setMarkers(filteredMarkers);
    } else {
      setMarkers(markers);
    }
    setPrevMarkers(markers);
    setMenu(true);
    handleGetCategory();
  };

  let handleGetCategories = async () => {
    // update all the marker in state
    setMenu(true);
    handleChangeMode(MENU_MODES.ADD_CATEGORY);
  };

  let handleGetCategory = async () => {
    let categories = await request(
      `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}`,
      getTokenSilently,
      loginWithPopup
    );
    setCategories(categories);
  };
  let handleEditForm = async newContent => {
    let result = await requestPOI.updatePOI(
      newContent.poiId,
      newContent.newPOI,
      getTokenSilently,
      loginWithPopup
    );
    if (
      result &&
      result.id &&
      newContent.newPOI.categories &&
      newContent.newPOI.categories.length > 0
    ) {
      let cat = newContent.newPOI.categories.map(myCat => myCat.id);
      await requestPOI.updatePOICategory(
        result.id,
        cat,
        getTokenSilently,
        loginWithPopup
      );
    }
    setMenuMode(MENU_MODES.DEFAULT);
    handleGetPOI();
  };
  let handleForm = async newPOI => {
    try {
      let result = await requestPOI.addNewPOI(
        newPOI,
        getTokenSilently,
        loginWithPopup
      );
      if (
        result &&
        result.id &&
        newPOI.categories &&
        newPOI.categories.length > 0
      ) {
        let cat = newPOI.categories.map(myCat => myCat.id);
        await requestPOI.updatePOICategory(
          result.id,
          cat,
          getTokenSilently,
          loginWithPopup
        );
      }
      setMenuMode(MENU_MODES.DEFAULT);
      handleGetPOI();
    } catch (error) {}
  };
  let handleFormCategory = async newCategory => {
    await getTokenSilently();
    try {
      await requestPOI.addNewCategory(
        newCategory,
        getTokenSilently,
        loginWithPopup
      );
      setMenuMode(MENU_MODES.DEFAULT);
      handleGetPOI();
    } catch (error) {}
  };

  let handleMenuChange = isOpen => {
    setMenuState(isOpen);
  };
  let handleChangeMode = mode => {
    setMenuMode(mode);
  };
  let handleFilterGroup = group => {
    setCanDeletePOI(false);
    if (prevMarkers && prevMarkers.length > 0) {
      let filteredMarkers = prevMarkers.filter(
        prevMarkers => prevMarkers.content.poi.group == group
      );
      setMarkers(filteredMarkers);
    }
  };

  //Toggle user mode (can delete/edit poi)
  let handleFilterUser = () => {
    setCanDeletePOI(!canDeletePOI);
  };
  // handles user mode
  useEffect(() => {
    if (canDeletePOI) {
      if (prevMarkers && prevMarkers.length > 0) {
        let filteredMarkers = prevMarkers.filter(
          prevMarkers => prevMarkers.content.poi.Creator.email == user.email
        );
        setMarkers(filteredMarkers);
      }
    } else {
      handleGetPOI();
    }
  }, [canDeletePOI]);

  let handleDeletePOI = async id => {
    await requestPOI.deletePOI(id, getTokenSilently, loginWithPopup);
    handleGetPOI();
  };
  if (loading) {
    return <Loading />;
  }
  if (markers.length == 0 && isAuthenticated && !loadingMarkers) {
    setLoaddingMarkers(true);
    handleGetPOI();
  }
  let handleLikePOI = async id => {
    await requestPOI.likePOI(id, getTokenSilently, loginWithPopup);
    await handleGetPOI();
  };
  let handleUnlikePOI = async id => {
    await requestPOI.unlikePOI(id, getTokenSilently, loginWithPopup);
    await handleGetPOI();
  };
  return (
    <div className="App">
      <div style={{ height: "60px" }}>
        <NavigationBar
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          toggleMenu={toggleMenu}
          handleGetPOI={handleGetPOI}
          handleGetCategory={handleGetCategories}
          isAuthenticated={isAuthenticated}
          user={user}
          handleOpenGuide={handleOpenGuide}
        />
      </div>
      <header className="App-header">
        <MyMap
          markers={markers}
          categories={categories}
          menuState={menuState}
          menuMode={menuMode}
          isAuthenticated={isAuthenticated}
          toggleMenu={toggleMenu}
          setMenu={setMenu}
          handleMenuChange={handleMenuChange}
          handleForm={handleForm}
          handleFormCategory={handleFormCategory}
          handleChangeMode={handleChangeMode}
          handleFilterGroup={handleFilterGroup}
          handleFilterUser={handleFilterUser}
          canDeletePOI={canDeletePOI}
          handleDeletePOI={handleDeletePOI}
          handleEditForm={handleEditForm}
          handleLikePOI={handleLikePOI}
          handleUnlikePOI={handleUnlikePOI}
        />
      </header>
    </div>
  );
}

export default App;
