import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container, Divider, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteServiceDialog from "./DeleteServiceDialog";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";

export default function RequestedService(props) {
    const [requestedService, setRequestedService] = useState(props.requestedService);
    const [user, setUser] = useState(null);
    let myUserInfo = useSelector((state) => state.user);
    let bp = require("./Path.js");

    useEffect(() => {
        let mounted = true;
        if (requestedService !== null) {
            axios
            .post(bp.buildPath("api/get-user"), {
                userId: requestedService.RequesterId,
            })
            .then((response) => {
                if (mounted) {
                    setUser(response.data.user);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        return () => mounted = false;
    }, [requestedService]);

    const Img = styled("img")({
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    });

    console.log(user)

    async function acceptRequest() {
        await axios
            .post(bp.buildPath("api/accept-request"), {
                requestedServiceId: requestedService._id,
                jwtToken: myUserInfo.jwtToken
            })
            .then((response) => {
                setUser({...myUserInfo, jwtToken: response.data.refreshedToken});
                setRequestedService({ ...requestedService, Accepted: true})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function denyRequest() {
        await axios
            .post(bp.buildPath("api/deny-request"), {
                requestedServiceId: requestedService._id,
                jwtToken: myUserInfo.jwtToken
            })
            .then((response) => {
                setUser({...myUserInfo, jwtToken: response.data.refreshedToken});
                setRequestedService(null)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    console.log(requestedService);

    // sx={{bgcolor: 'green'}}

    return (
        <Container>
            {user !== null && requestedService !== null && (
                <Paper
                    sx={{
                        margin: "auto",
                        maxWidth: 800,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#1A2027" : "white",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item sx={{ p: 2, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#2074d4' }}>
                            <Img sx={{ width: 256, height: 256 }} alt="complex" src={user.ProfilePicture === null ? '' : user.ProfilePicture} />
                        </Grid>
                        <Grid item xs={12} md container >

                            <Grid item xs >
                                <Stack direction="column" sx={{ width: '100%', height: '100%' }}>

                                  <Box sx={{ pr: 3, display: 'flex', flexDirection: 'row-reverse' }}>
                                    {!requestedService.Accepted ? 
                                    <Box>
                                      <IconButton onClick={() => acceptRequest()}>
                                          <CheckIcon color="success" />
                                      </IconButton>
                                      <IconButton onClick={() => denyRequest()}>
                                          <ClearIcon color="warning" />
                                      </IconButton>

                                    </Box>

                                    : <Typography>Accepted</Typography>}
                                  </Box>

                                  <Box m={2} />

                                  <Container sx={{ display: 'flex', justifyContent: "center" }}>
                                    <Stack direction="column" sx={{ textAlign: 'center', maxWidth: '65%' }}  spacing={1} divider={<Divider orientation="horizontal" flexItem />}>
                                        <Container sx={{ display: 'flex', justifyContent: "center" }}>

                                            <Typography
                                                variant="h4"
                                                sx={{ fontWeight: "bold" }}
                                                component="div"
                                            >
                                                {user.FirstName} {user.LastName}
                                            </Typography>
                                        </Container>

                                        <Typography variant="body1">
                                            Their Request: {requestedService.DescriptionFromRequester}
                                        </Typography>

                                        <Stack
                                          sx={{ display: 'flex', justifyContent: "center" }} 
                                          direction="row" 
                                          spacing={1} 
                                          divider={<Divider orientation="vertical" flexItem />}
                                        >
                                          <Typography
                                              variant="h5"
                                          >
                                              {new Date(requestedService.Dates).toLocaleDateString("en-US")}
                                          </Typography>
                                          <Typography variant="h5" >
                                              ${requestedService.Price}
                                          </Typography>
                                        </Stack>
                                    </Stack>

                                  </Container>
                                </Stack>


                            </Grid>

                            {/* <Grid item >
                              <Box>
                                {!requestedService.Accepted ? 
                                <Box>
                                  <IconButton onClick={() => acceptRequest()}>
                                      <CheckIcon color="success" />
                                  </IconButton>
                                  <IconButton onClick={() => denyRequest()}>
                                      <ClearIcon color="warning" />
                                  </IconButton>

                                </Box>

                                : <Typography>Accepted</Typography>}
                                <Box m={6}/>
                              </Box>
                            </Grid> */}

                        </Grid>
                    </Grid>


                </Paper>
            )
            }
        </Container >
    );
}
