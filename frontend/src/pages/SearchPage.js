import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import Navbar from '../components/NavBar';
import SearchResults from "../components/SearchResults";
import Map from '../components/Map';
import { useNavigate, useLocation } from "react-router-dom";

import {
  Container,
  Grid,
  Box
} from "@mui/material";

// TODO: fix how marker titles look
// TODO: show service image (replace bread image with actual)
// TODO: customize marker info popup
// TODO: adjust zoom level to fit all markers

const SearchPage = () =>
{
  const { state } = useLocation();
  let [focusItem, setFocusItem] = React.useState(null);

  const updateFromChild = (newFocus) => {
    setFocusItem(newFocus);
  };

  // console.log(state);

  let center = state ? state.res.searchLocationCoords : {
    lat: 28.602,
    lng: -81.200,
  };
    
  // console.log('in search page');
  // console.log(center);

  let items = [];

  // add dummy services
  for (let i = 0; i < 20; i++) {
    items.push({
      _id: i.toString(),
      UserId: "6234c4d39a050a36555a6942",
      Title: "Bakery" + i,
      Images: [
        "image1",
        "image2"
      ],
      Address: "14330 Alafaya Oak Bend",
      Longitude: "-81.1705685",
      Latitude: "28.510048",
      Description: "My Bakery is so cool",
      Price: "5",
      DaysAvailable: [
        "Monday"
      ],
      Category: "Baking",
      __v: 0
    })
  }

  let res = (state ? state.res : null);
  let srch = (state ? state.obj : null);

  return (
    <Box>
      <Navbar search={srch}/>
      <br />

      <Container maxWidth={false} sx={{
            width: { xl: '80%'},
            height: '1000px'
          }}>
        <Grid container sx={{height: '100%'}}>
          <Grid item xs={3} sx={{height: '100%'}}>
            <SearchResults
              focus={focusItem}
              updateFocus={updateFromChild}
              results={(res && res.error == '') ? res.results : items}
            />
          </Grid>
          <Grid item xs={9} sx={{height: '100%'}}>
            <Map
              focus={focusItem}
              updateFocus={updateFromChild}
              results={(res && res.error == '') ? res.results : items}
              center={center}
            />
          </Grid>
        </Grid>
      </Container>


      {/* <span>change lat-lng and to re-center map.</span>
      <input id="tempInput1" type="text" placeholder='lat' value={center.lat} onChange={centerChange('lat')}/>
      <input id="tempInput2" type="text" placeholder='lng' value={center.lng} onChange={centerChange('lng')}/> */}
    </Box>
  );
}

export default SearchPage;