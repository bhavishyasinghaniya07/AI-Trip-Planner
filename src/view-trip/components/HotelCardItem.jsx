import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import {
  FaStar,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "./HotelCardItem.css";

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hotel?.hotelName) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    setIsLoading(true);
    try {
      const data = {
        textQuery: hotel?.hotelName,
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
          "https://imgs.search.brave.com/0gAUiGVp5yUvd1b7Yj7MgAnDlBQ3II9h9YbMSa3lKuA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzA0LzEzLzU3/LzM2MF9GXzEwNDEz/NTc5MV8xY0xaSE5N/N1k3NFRGc0xLdEcw/OEpjZmJJZTNTaVJt/YS5qcGc"
        );
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
      setPhotoUrl(
        "https://imgs.search.brave.com/0gAUiGVp5yUvd1b7Yj7MgAnDlBQ3II9h9YbMSa3lKuA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzA0LzEzLzU3/LzM2MF9GXzEwNDEz/NTc5MV8xY0xaSE5N/N1k3NFRGc0xLdEcw/OEpjZmJJZTNTaVJt/YS5qcGc"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getStarRating = (rating) => {
    const stars = [];
    const ratingNum = parseFloat(rating);

    for (let i = 0; i < 5; i++) {
      if (i < ratingNum) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else {
        stars.push(<FaStar key={i} className="star empty" />);
      }
    }

    return stars;
  };

  return (
    <div className="hotel-card">
      <Link
        className="hotel-link"
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          hotel?.hotelName + "," + hotel?.hotelAddress
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="hotel-image-container">
          {isLoading ? (
            <div className="hotel-image-skeleton"></div>
          ) : (
            <img
              src={photoUrl}
              alt={hotel?.hotelName || "Hotel"}
              className="hotel-image"
              onError={() =>
                setPhotoUrl(
                  "https://imgs.search.brave.com/0gAUiGVp5yUvd1b7Yj7MgAnDlBQ3II9h9YbMSa3lKuA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzA0LzEzLzU3/LzM2MF9GXzEwNDEz/NTc5MV8xY0xaSE5N/N1k3NFRGc0xLdEcw/OEpjZmJJZTNTaVJt/YS5qcGc"
                )
              }
            />
          )}
          <div className="hotel-view-map">
            <FaExternalLinkAlt /> View on Maps
          </div>
        </div>

        <div className="hotel-content">
          <h3 className="hotel-name">{hotel?.hotelName}</h3>

          <div className="hotel-rating">
            <div className="star-rating">{getStarRating(hotel?.rating)}</div>
            <span className="rating-text">{hotel?.rating}/5</span>
          </div>

          <div className="hotel-price">
            <FaRupeeSign /> {(hotel?.price * 80).toLocaleString("en-IN")}
          </div>

          <div className="hotel-address">
            <FaMapMarkerAlt className="address-icon" />
            <span>{hotel?.hotelAddress}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
