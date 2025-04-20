import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import {
  FaMapMarkerAlt,
  FaClock,
  FaTicketAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import "./PlaceCardItem.css";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    setIsLoading(true);
    try {
      const data = { textQuery: place?.placeName };
      const result = await GetPlaceDetails(data);

      if (
        result?.data?.places?.length > 0 &&
        result.data.places[0].photos?.length > 0
      ) {
        const photoRef = result.data.places[0].photos[0].name;
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
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

  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`place-card ${isExpanded ? "expanded" : ""}`}>
      <div className="place-card-content">
        <div className="place-image-container">
          {isLoading ? (
            <div className="place-image-skeleton"></div>
          ) : (
            <img
              src={photoUrl}
              alt={place.placeName}
              className="place-image"
              onError={() =>
                setPhotoUrl(
                  "https://plus.unsplash.com/premium_photo-1678481760861-000b6f8904df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            />
          )}
        </div>

        <div className="place-info">
          <h3 className="place-name">{place.placeName}</h3>

          <div className="place-meta">
            <div className="meta-item">
              <FaClock className="meta-icon" />
              <span>{place.timeDuration}</span>
            </div>

            <div className="meta-item">
              <FaTicketAlt className="meta-icon" />
              <span>₹ {place.ticketPricing}</span>
            </div>

            <div className="meta-item">
              <FaCalendarAlt className="meta-icon" />
              <span>Best time: {place.bestTimeToVisit}</span>
            </div>
          </div>

          <div className="place-details-preview">
            <p>{place.placeDetails.substring(0, 100)}...</p>
          </div>

          <div className="place-card-actions">
            <button className="expand-btn" onClick={toggleExpand}>
              {isExpanded ? "Show Less" : "Read More"}
            </button>

            <Link
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                place.placeName
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="maps-link"
            >
              <FaMapMarkerAlt /> View on Maps
            </Link>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="place-expanded-content">
          <div className="place-details-full">
            <h4>About this place</h4>
            <p>{place.placeDetails}</p>

            <h4>Tips and Recommendations</h4>
            <p>Don't forget to {place.mustDoThing}</p>
            <p>{place.suggestions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceCardItem;
