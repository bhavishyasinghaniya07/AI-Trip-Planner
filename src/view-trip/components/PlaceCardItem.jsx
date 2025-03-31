import React, { useEffect, useState } from "react";
import placeholder from "../../assets/placeholder.jpg";
import { Link } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import "./PlaceCardItem.css";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState(placeholder); // Default to placeholder

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: place?.placeName };
      const result = await GetPlaceDetails(data);

      if (
        result?.data?.places?.length > 0 &&
        result.data.places[0].photos?.length > 0
      ) {
        const photoRef = result.data.places[0].photos[0].name; // Use first photo
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <Link
      className="place-card-link"
      target="_blank"
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
    >
      <div className="place-card">
        <div className="place-card-image">
          <img
            src={photoUrl}
            alt={place.placeName}
            onError={() => setPhotoUrl(placeholder)} // If image fails to load, fallback to placeholder
          />
        </div>

        <div className="place-card-info">
          <h2 className="place-name">{place.placeName}</h2>
          <h3 className="time-duration">{place.timeDuration}</h3>
          <h3 className="ticket-price">
            Ticket Price: ₹ {place.ticketPricing}
          </h3>
        </div>

        <div className="place-details">
          <h3>Place Details:</h3>
          <p>{place.placeDetails}</p>
          <p>
            Don't forget to {place.mustDoThing} <br /> {place.suggestions}
          </p>
        </div>

        <div className="best-time-section">
          <h3 className="best-time">
            Best Time To Visit: {place.bestTimeToVisit}
          </h3>
          <button className="location-button">
            <MdOutlineLocationOn /> See on Google Maps
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
