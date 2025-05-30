import {
  AI_PROMPT,
  SelectAccommodationList,
  SelectBudgetOptions,
  SelectFoodList,
  SelectInterestsList,
  SelectTransportList,
  SelectTravelesList,
  SelectTripPaceList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import "./index.css";

import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      formData?.noOfDays > 10 ||
      formData?.noOfDays < 1 ||
      !formData?.noOfDays ||
      !formData?.location ||
      !formData.budget ||
      !formData.traveler
    ) {
      alert("Please fill all valid details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{tripPace}", formData?.tripPace)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{interest}", formData?.interest)
      .replace("{transport}", formData?.transport)
      .replace("{accommodation}", formData?.accommodation)
      .replace("{tripPace}", formData?.tripPace)
      .replace("{food}", formData?.food);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error in chat session:", error);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      TripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

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

  const sections = [
    {
      title: "Your budget for the trip?",
      list: SelectBudgetOptions,
      key: "budget",
      className: "budget",
    },
    {
      title: "Who are you traveling with?",
      list: SelectTravelesList,
      key: "traveler",
      className: "traveler",
    },
    {
      title: "What interests you?",
      list: SelectInterestsList,
      key: "interest",
      className: "interest",
    },
    {
      title: "Preferred Accommodation",
      list: SelectAccommodationList,
      key: "accommodation",
      className: "accommodation",
    },
    {
      title: "Preferred Transport Mode",
      list: SelectTransportList,
      key: "transport",
      className: "transport",
    },
    {
      title: "Preferred Food Preference",
      list: SelectFoodList,
      key: "food",
      className: "food",
    },
    // {
    //   title: "Preferred Trip Pace",
    //   list: SelectTripPaceList,
    //   key: "tripPace",
    //   className: "trip-pace",
    // },
  ];

  return (
    <div className="main-container">
      <div className="trip-form-container">
        <div className="header-section">
          <h1 className="main-title">Smart Trip Planner</h1>
          <p className="main-description">
            Tell us your preferences, and we'll create a personalized itinerary
            just for you
          </p>
        </div>

        <div className="destinations-section">
          <div className="input-group">
            <div className="input-label">
              <FaMapMarkerAlt className="input-icon" />
              <h2>Where do you want to go?</h2>
            </div>
            <div className="google-places-wrapper">
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  value: place,
                  onChange: (v) => {
                    setPlace(v);
                    handleInputChange("location", v);
                  },
                  placeholder: "Search for destinations...",
                  styles: {
                    control: (base) => ({
                      ...base,
                      border: "1px solid #dde1e7",
                      borderRadius: "12px",
                      padding: "4px 8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      fontSize: "16px",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#a0aec0",
                    }),
                  },
                }}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-label">
              <FaCalendarAlt className="input-icon" />
              <h2>How many days are you planning?</h2>
            </div>
            <input
              placeholder="Enter number of days (1-10)"
              type="number"
              min="1"
              max="10"
              className="days-input"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        <div className="preferences-section">
          {sections.map((section, index) => (
            <div key={index} className="preference-card">
              <h2 className="preference-title">{section.title}</h2>
              <div className={`options-grid ${section.className}-options`}>
                {section.list.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleInputChange(section.key, item.title)}
                    className={`option-item ${
                      formData?.[section.key] === item.title ? "selected" : ""
                    }`}
                  >
                    <div className="option-icon">{item.icon}</div>
                    <div className="option-text">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="action-section">
          <button
            disabled={loading}
            className="generate-button"
            onClick={onGenerateTrip}
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="loading-icon spin" />
                Wait..Creating your trip...
              </>
            ) : (
              "Generate My Trip Plan"
            )}
          </button>
        </div>
      </div>

      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <img src={logo} alt="Logo" className="dialog-logo" />
            <h2 className="dialog-title">Sign In Required</h2>
            <p className="dialog-text">
              Please sign in with Google to create and save your trip plan.
            </p>
            <div className="dialog-buttons">
              <button onClick={login} className="google-signin-button">
                <FcGoogle className="google-icon" /> Sign In With Google
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
      )}
    </div>
  );
}

export default CreateTrip;
