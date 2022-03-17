import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import '../LoginBox.css'
import Button from '@mui/material/Button'

function Login() {
  var bp = require("./Path.js");
  var loginEmail;
  var loginPassword;

  const [message, setMessage] = useState("");
  
  const doLogin = async (event) => {
    event.preventDefault();
    
    var obj = { email: loginEmail.value, password: loginPassword.value };
    var js = JSON.stringify(obj);

    // alert('click');

    try {
      const response = await fetch(bp.buildPath("api/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      
      if (res.id <= 0) {
        setMessage("User/Password combination incorrect");
      } else {
        alert('found');
        setMessage("");
        var storage = require("../tokenStorage.js");
        var user = jwt_decode(res)
        localStorage.setItem("user_data", JSON.stringify(user))
        storage.storeToken(res);
        window.location.href = "/";
      }
    } catch (e) {
      console.log(e.toString());
      return; 
    }
  };

  return (
    <div id="loginDiv">
      <form onSubmit={doLogin}>
        <span className="log" id="inner-title">Log In</span>

        {/* <br /> */}

        <div className="innerbox">
          <label className="epfont">Email/Username:</label>
          <br />
          <input className="env" type="text"
            id="loginName"
            placeholder="Username/Email Address"
            ref={(c) => (loginEmail = c)}
          />
          {/* <hr /> */}
          <label className="epfont">Password:</label>
          <input className="pas"
            type="password"
            id="loginPassword"
            placeholder="Password"
            ref={(c) => (loginPassword = c)}
          />
          {/* <hr /> */}
        </div>

        <div className="inner2box">
          <span id="loginResult">{message}</span>
          <p></p>
          <Button id="loginButton" variant="contained" onClick={doLogin}>Log in</Button>
          {/* <input type="submit"
            id="loginButton"
            className="buttons"
            value="Do It"
            onClick={doLogin}
          /> */}
          <p className="alignbot">New to Handler? <a href="https://www.google.com">Create a New Account!</a></p>
        </div>
      </form>
      
    </div>
  );
}

export default Login;
