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
  const [openDialog, setOpenDialog] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(user?.picture || placeholder);

  useEffect(() => {
    console.log(user);
  }, []);

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

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-container">
              <img src={logo} className="logo" alt="Logo" />
            </div>

            <nav className="nav-container">
              {user ? (
                <>
                  <div className="nav-links">
                    <a href="/" className="nav-link">
                      <button className="nav-button">Home</button>
                    </a>
                    <a href="/create-trip" className="nav-link">
                      <button className="nav-button">Plan</button>
                    </a>
                    <a href="/my-trips" className="nav-link">
                      <button className="nav-button">Itineraries</button>
                    </a>
                    <button
                      onClick={handleLogout}
                      className="nav-button logout-button"
                    >
                      Logout
                    </button>
                  </div>

                  <div className="user-profile">
                    <img
                      className="user-avatar"
                      src={photoUrl}
                      alt="User"
                      onError={() => setPhotoUrl(placeholder)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="nav-links">
                    <a href="/" className="nav-link">
                      <button className="nav-button">Home</button>
                    </a>
                    <button
                      className="nav-button signin-button"
                      onClick={() => setOpenDialog(true)}
                    >
                      Sign In
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-header">
              <img src={logo} alt="Logo" className="dialog-logo" />
              <h2 className="dialog-title">Welcome Back</h2>
            </div>
            <div className="dialog-content">
              <p className="dialog-text">
                Sign in with Google to access your trips and create new itineraries.
              </p>
              <div className="dialog-buttons">
                <button onClick={login} className="google-signin-button">
                  <FcGoogle className="google-icon" /> Continue with Google
                </button>
                <button
                  className="back-button"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;