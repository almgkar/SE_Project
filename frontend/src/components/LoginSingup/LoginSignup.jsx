import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
// import { useAuth } from "./Context";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import logo from "../Assets/logo.png"; // Import the logo image
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import userSession from "./userSession";
const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, SetAction] = useState("Sign Up");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);
  const [password, setPassword] = useState("");
  const handlePwdChange = (e) => setPassword(e.target.value);
  var auth2;

  const validateSignUpCreds = () => {
    if (action == "Login") {
      SetAction("Sign Up");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: email, user_passkey: password }),
    };
    fetch("http://localhost:3001/login/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        userSession.setUserId(data.user_id);
        userSession.setUserType(data.category);
        const area = userSession.getRequestArea();
        if ((area === "Book") & (data.category === "user")) {
          navigate("/");
        } else if (data.category === "user") {
          navigate("/Dashboard", {
            state: { user_id: email, token: data?.token },
          });
        } else {
          //failure
          setError(true);
          setErrorMsg(data?.error);
        }
      });
  };

  const validateLoginCreds = () => {
    if (action == "Sign Up") {
      SetAction("Login");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: email, user_passkey: password }),
    };
    fetch("http://localhost:3001/login/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data?.token) {
          setError(false);
          //success
          console.log(data.category);
          userSession.setUserId(data.user_id);
          userSession.setUserType(data.category);
          const area = userSession.getRequestArea();
          const bookId = userSession.getbookId();
          if ((area === "Book") & (data.category === "user")) {
            navigate(`/book/${bookId}`);
          } else if (data.category === "user") {
            navigate("/Dashboard", {
              state: { user_id: email, token: data?.token },
            });
          } else if (data.category === "employee") {
            navigate("/EmployeeDashboard", {
              state: { user_id: email, token: data?.token },
            });
          } else if (data.category === "admin") {
            navigate("/AdminDashboard", {
              state: { user_id: email, token: data?.token },
            });
          } else if (data.category === "support") {
            navigate("/CustomerSupport", {
              state: { user_id: email, token: data?.token },
            });
          } else {
            navigate("/book");
          }
        } else {
          //failure
          setError(true);
          setErrorMsg(data?.error);
        }
      });
  };

  // useEffect(() => {
  //   window.gapi.load("auth2", () => {
  //     auth2 = window.gapi.auth2.init({
  //       client_id:
  //         "697032302275-4ghbaj2arfvn1vg02c2mlhsvvd4v8s3c.apps.googleusercontent.com",
  //     });
  //   });

  //   window.gapi.load("signin2", function () {
  //     // render a sign in button
  //     // using this method will show Signed In if the user is already signed in
  //     var opts = {
  //       width: 200,
  //       height: 50,
  //       onSuccess: onSuccess.bind(this),
  //     };
  //     window.gapi.signin2.render("gloginButton", opts);
  //   });
  // }, []);

  const onSuccessLogin = (res) => {
    // let googleAuth = request.postRequest(constants.REQUEST.GOOGLE_EP, res);
    // googleAuth.then((response) => {
    //   if (response.ok) {
    //     response.json().then((data) => {
    //       setSuccess("Signin Successful");
    //       authContext.login(data.token);
    //     });
    //   } else {
    //     console.log(response);
    //   }
    // });
    console.log(res);
  };

  const onSuccess = (res) => {
    // let googleAuth = request.postRequest(constants.REQUEST.GOOGLE_EP, res);
    // googleAuth.then((response) => {
    //   if (response.ok) {
    //     response.json().then((data) => {
    //       setSuccess("Signin Successful");
    //       context.login(data.token);
    //     });
    //   } else {
    //     console.log(response);
    //   }
    // });
    console.log(res);
  };

  const onFailure = (res) => {
    console.log(res.error);
  };

  function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    const idToken = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + idToken);
  }

  return (
    <div className="signup-container">
      <img src={logo} alt="Logo" className="logo" /> {/* Add this line */}
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            value={email}
            placeholder="Email ID"
            onChange={handleEmailChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            value={password}
            placeholder="Your Password"
            onChange={handlePwdChange}
          />
        </div>
        {action === "Login" ? (
          <GoogleOAuthProvider clientId="697032302275-4ghbaj2arfvn1vg02c2mlhsvvd4v8s3c.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        ) : (
          <GoogleOAuthProvider clientId="697032302275-4ghbaj2arfvn1vg02c2mlhsvvd4v8s3c.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        )}
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Forgot Password? <span> Reset</span>
        </div>
      )}
      {error && <span className="error">{errorMsg}</span>}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          // onClick={() => {
          //   SetAction("Sign Up");
          // }}
          onClick={validateSignUpCreds}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={validateLoginCreds}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
