import React, { useEffect, useState } from "react";
import ViewTrip from "../[tripId]";
import { FaShare } from "react-icons/fa";
import placeholder from "../../assets/placeholder.jpg";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import "./InfoSection.css";

const InfoSection = ({ trip }) => {
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <div className="info-section">
      <img
        src={photoUrl}
        onError={() =>
          setPhotoUrl(
            "https://plus.unsplash.com/premium_photo-1678481760861-000b6f8904df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          )
        }
        className="trip-image"
      />

      <div className="trip-details">
        <div className="trip-title">{trip?.userSelection?.location?.label}</div>
        <div className="trip-tags">
          <h3>📅 {trip?.userSelection?.noOfDays} Days</h3>
          <h3>💰 {trip?.userSelection?.budget} Budget</h3>
          <h3>🏄‍♂️ {trip?.userSelection?.traveler} People</h3>
          <h3>🎡 {trip?.userSelection?.interest}</h3>
          <h3>⚡ {trip?.userSelection?.tripPace} Pace</h3>
          <h3>🚗 {trip?.userSelection?.transport}</h3>
          <h3>🍕 {trip?.userSelection?.food}</h3>
          <h3>⛺ {trip?.userSelection?.accommodation}</h3>
        </div>
        <button className="share-trip">
          <FaShare size={12} /> Share Your Trip
        </button>
      </div>
    </div>
  );
};

export default InfoSection;
