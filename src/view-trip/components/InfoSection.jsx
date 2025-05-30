import React, { useEffect, useState } from "react";
import {
  FaShare,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaUmbrellaBeach,
  FaBolt,
  FaCar,
  FaPizzaSlice,
  FaCampground,
} from "react-icons/fa";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import "./infoSection.css";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  const handlePredictExpense = async () => {
    const predictionData = {
      place: (trip?.userSelection?.location?.label || "")
        .split(/[\s,]+/)[0]
        .toLowerCase(),
      budget: (trip?.userSelection?.budget || "").toString().toLowerCase(),
      travellingwith: (trip?.userSelection?.traveler || "").toLowerCase(),
      interest: (trip?.userSelection?.interest || "").toLowerCase(),
      accommodationtype: (
        trip?.userSelection?.accommodation || ""
      ).toLowerCase(),
      transportmode: (trip?.userSelection?.transport || "").toLowerCase(),
      foodtype:
        (trip?.userSelection?.food || "").replace(" ", "").toLowerCase() ===
        "vegetarian"
          ? "veg"
          : (trip?.userSelection?.food || "").toLowerCase(),
      noofday: (trip?.userSelection?.noOfDays || "").toString().toLowerCase(),
    };

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(predictionData),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }
      const result = await response.json();
      setPredictionResult(result);
    } catch (error) {
      console.error("Error predicting expense:", error);
      alert("Failed to predict expense.");
    }
  };

  const GetPlacePhoto = async () => {
    setIsLoading(true);
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      const resp = await GetPlaceDetails(data);

      if (resp?.data?.places?.[0]?.photos?.[3]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl(
          "https://plus.unsplash.com/premium_photo-1678481760861-000b6f8904df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        );
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl(
        "https://plus.unsplash.com/premium_photo-1678481760861-000b6f8904df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareTrip = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!trip?.userSelection) return null;

  return (
    <div className="info-section">
      <div className="info-banner">
        <div className="trip-image-container">
          {isLoading ? (
            <div className="image-skeleton"></div>
          ) : (
            <img
              src={photoUrl}
              alt={trip?.userSelection?.location?.label || "Trip destination"}
              className="trip-image"
              onError={() =>
                setPhotoUrl(
                  "https://plus.unsplash.com/premium_photo-1678481760861-000b6f8904df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            />
          )}
        </div>

        <div className="trip-info-container">
          <h1 className="trip-title">
            <FaMapMarkerAlt /> {trip?.userSelection?.location?.label}
          </h1>

          <div className="trip-tags">
            <div className="tag">
              <FaCalendarAlt /> {trip?.userSelection?.noOfDays} Days
            </div>
            <div className="tag">
              <FaMoneyBillWave /> {trip?.userSelection?.budget} Budget
            </div>
            <div className="tag">
              <FaUsers /> {trip?.userSelection?.traveler} People
            </div>
            <div className="tag">
              <FaUmbrellaBeach /> {trip?.userSelection?.interest}
            </div>
            <div className="tag">
              <FaBolt /> {trip?.userSelection?.tripPace} Pace
            </div>
            <div className="tag">
              <FaCar /> {trip?.userSelection?.transport}
            </div>
            <div className="tag">
              <FaPizzaSlice /> {trip?.userSelection?.food}
            </div>
            <div className="tag">
              <FaCampground /> {trip?.userSelection?.accommodation}
            </div>
          </div>

          <button
            className="share-trip-btn"
            onClick={handleShareTrip}
            aria-label="Share trip"
          >
            <FaShare /> {isCopied ? "Link Copied!" : "Share Your Trip"}
          </button>
          <button
            className="predict-expense-btn share-trip-btn"
            aria-label="Share trip"
            onClick={handlePredictExpense}
          >
            Predict Expense
          </button>
          {predictionResult && (
            <div className="text-center mt-4 p-4 rounded-lg shadow-lg bg-white text-black w-full max-w-md">
              <h2 className="text-xl font-semibold mb-2">Predicted Expenses</h2>
              <p>
                <strong>Total:</strong>{" "}
                <span className="color-green">
                  ₹{predictionResult.total_expense}
                </span>
              </p>
              <p>
                <strong>Accommodation:</strong>{" "}
                <span className="color-green">
                  ₹{predictionResult.accommodation}
                </span>
              </p>
              <p>
                <strong>Food:</strong>{" "}
                <span className="color-green">₹{predictionResult.food}</span>
              </p>
              <p>
                <strong>Travel:</strong>{" "}
                <span className="color-green">₹{predictionResult.travel}</span>
              </p>
              <p>
                <strong>Per Person:</strong>{" "}
                <span className="color-green">
                  ₹{predictionResult.per_person}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
