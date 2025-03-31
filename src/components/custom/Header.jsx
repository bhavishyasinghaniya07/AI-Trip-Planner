// JSX File (Header.js)
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import logo from "../../assets/logo2.png";
import "./Header.css";
import placeholder from "../../assets/placeholder.jpg";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  }, []);

  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <>
      {!openDialog && (
        <div className="navbar">
          <img src={logo} className="logo" alt="Logo" />

          <div className="nav-links">
            {user ? (
              <>
                <a href="/">
                  <button className="nav-button">Home</button>
                </a>
                <a href="/create-trip">
                  <button className="nav-button">+ Create Trip</button>
                </a>
                <a href="/my-trips">
                  <button className="nav-button">My Trips</button>
                </a>
                <a href="/">
                  <button
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="nav-button"
                  >
                    Logout
                  </button>
                </a>

                <img
                  className="user-avatar"
                  src={user?.picture}
                  onError={() => setPhotoUrl("placeholder")}
                />
              </>
            ) : (
              <>
                <a href="/">
                  <button className="nav-button">Home</button>
                </a>
                <button
                  className="nav-button"
                  onClick={() => setOpenDialog(true)}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <img src={logo} alt="Logo" className="dialog-logo" />
            <h2 className="dialog-title">Sign In With Google</h2>
            <p className="dialog-text">
              Sign in to the App with Google authentication securely.
            </p>
            <div className="dialog-buttons">
              <button onClick={login} className="google-signin-button">
                <FcGoogle className="google-icon" /> Sign In With Google
              </button>
              <button
                className="back-button"
                onClick={() => setOpenDialog(false)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
