import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/NavBar';
import SearchBar from "../components/SearchBar.js"
import MapComponent from '../components/Map';

import {
  Container
} from "@mui/material";

const HomePage = () =>
{
  let [center, setCenter] = useState({
    lat: '28.602',
    lng: '-81.200'
  });

  const centerChange = (prop) => (event) => {
    setCenter({ ...center, [prop]: event.target.value });
  };

  var storage = require("../tokenStorage.js");

  let user = storage.retrieveToken();

  if (user == null) {
    user = 'null';
  } else {
    user = JSON.stringify(jwt_decode(user));
  }

  return(
    <div>
      <ResponsiveAppBar />
      <h1>Handler</h1>
      <h2>Hello user: {user}</h2>

      <Container maxWidth="md">
        <SearchBar />
      </Container>
    </div>
    
  );
}

export default HomePage;