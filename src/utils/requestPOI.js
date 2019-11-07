export class requestPOI {
  //Update some Information for a POI
  static async updatePOI(id, updatePOI, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
        {
          method: "PATCH",
          body: JSON.stringify(updatePOI),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      //await loginWithPopup();
      return null;
    }
  }
  static async likePOI(poiId, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/poi/` + poiId + `/like`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      //await loginWithPopup();
      return null;
    }
  }
  static async unlikePOI(poiId, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/poi/` + poiId + `/unlike`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      //await loginWithPopup();
      return null;
    }
  }

  static async updatePOICategory(
    id,
    category,
    getTokenSilently,
    loginWithPopup
  ) {
    try {
      let token = await getTokenSilently();
      console.log(
        JSON.stringify(
          `${process.env.REACT_APP_SERVER_URL}/poi/` + id + `/category`
        )
      );
      console.log(JSON.stringify(category));
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/poi/` + id + `/category`,
        {
          method: "PATCH",
          body: JSON.stringify(category),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      return await response.json();
    } catch (e) {
      console.error(e);
      await loginWithPopup;
      return null;
    }
  }

  //Create a new POI in the Database
  static async addNewPOI(newPOI, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      // console.log(JSON.stringify(newPOI));
      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi`, {
        method: "POST",
        body: JSON.stringify(newPOI),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      return await response.json();
    } catch (e) {
      console.error(e);
      await loginWithPopup();
      return null;
    }
  }

  //Return all POIs from the Database
  static async getAllPOI(getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      await loginWithPopup();
    }
  }
  //Get some Information from a POI with the Id as paratmeter
  static async getPOI(id, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      return await response.json();
    } catch (e) {
      console.error(e);
      await loginWithPopup();
    }
  }
  //Delete a POI in the Database
  static async deletePOI(id, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      await loginWithPopup();
    }
  }
  static async addNewCategory(newCategory, getTokenSilently, loginWithPopup) {
    try {
      let token = await getTokenSilently();
      // console.log(JSON.stringify(newPOI));
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/category`,
        {
          method: "POST",
          body: JSON.stringify(newCategory),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      return await response.json();
    } catch (e) {
      console.error(e);
      await loginWithPopup();
      return null;
    }
  }
  /*   for get the route

    static async getRoute(itinary){
      let locations = [];
        for(let i in itinary) {
            if (itinary[i]) {
                locations.push(`${itinary[i].lat},${itinary[i].lng}`);
            }
        }
        console.log(locations);
        console.log(itinary);
        let response = await fetch(
            `https://www.mapquestapi.com/directions/v2/route?key=jnMr54lGGAhlHU2BkqurOpG8yvcaGJ6j`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "https://www.mapquestapi.com/",
                },
                body:JSON.stringify({
                        "locations": locations,
                        "options": {
                            "avoids": [],
                            "avoidTimedConditions": false,
                            "doReverseGeocode": true,
                            "shapeFormat": "raw",
                            "generalize": 0,
                            "routeType": "fastest",
                            "timeType": 1,
                            "locale": "en_US",
                            "unit": "m",
                            "enhancedNarrative": false,
                            "drivingStyle": 2,
                            "highwayEfficiency": 21.0
                        }
                    }
                )
            }
        );
        let data = await response.json();
        return data;
    }

     */
}

export default requestPOI;
