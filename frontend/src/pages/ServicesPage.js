import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';


export default function ServicesPage() {
  let services = useSelector((state) => state.services);
  const navigate = useNavigate()
  services = services.services; // Annoying

  function addService() {
    navigate("../addService")
  }

  return (
    <div>
      <ResponsiveAppBar/>
      <Grid container direction="column" spacing={5}>
        {services.map((service, index) => (
          <Grid item>
            <ServiceCard service={service} />
          </Grid>
        ))}
      </Grid>
      <Button onClick={() => addService()}></Button>
    </div>
  );
}
