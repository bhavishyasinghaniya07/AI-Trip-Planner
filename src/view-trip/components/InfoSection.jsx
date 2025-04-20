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

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

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
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
