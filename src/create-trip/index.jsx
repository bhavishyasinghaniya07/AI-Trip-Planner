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
import "./index.css";

import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { addDoc, doc, setDoc } from "firebase/firestore";
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
      setOpenDialog(true); // Ensure state updates
      console.log("Dialog should open now");
      return; // Ensure the function exits after setting state
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
    {
      title: "Preferred Trip Pace",
      list: SelectTripPaceList,
      key: "tripPace",
      className: "trip-pace",
    },
  ];

  return (
    <div className="container">
      <div className="travel-container">
        <h2 className="title">Tell us your travel preferences</h2>
        <p className="description">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preference.
        </p>
        <div className="input-container">
          {/* Destination Input */}
          <div className="w-[50%]">
            <h2 className="input-title">Where do you want to go?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
                placeholder: "Search Destination",
                styles: {
                  control: (base) => ({
                    ...base,
                    border: "1px solid #76E5FC",
                    borderRadius: "8px",
                    padding: "1px",
                  }),
                },
              }}
            />
          </div>

          {/* Number of Days Input */}
          <div className="w-[50%]">
            <h2 className="input-title">How many days are you planning?</h2>
            <input
              placeholder="Ex. 3"
              type="number"
              className="days-input"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        <div>
          {sections.map((section, index) => (
            <div key={index} className={`${section.className}-selection`}>
              <h2>{section.title}</h2>
              <div className={`${section.className}-options`}>
                {section.list.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleInputChange(section.key, item.title)}
                    className={`${section.className}-option ${
                      formData?.[section.key] === item.title ? "selected" : ""
                    }`}
                  >
                    <h2>{item.icon}</h2>
                    <h2>{item.title}</h2>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Generate Trip Button */}
      <div className="button-container">
        <button
          disabled={loading}
          className="generate-trip-button"
          onClick={onGenerateTrip}
        >
          {loading
            ? "Wait a few seconds, We are working on it..."
            : "Generate Trip"}
        </button>
      </div>

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
    </div>
  );
}

export default CreateTrip;
