import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../../assets/placeholder.jpg";
import "./HotelCardItem.css";

const HotelCardItem = ({ hotel }) => {
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };
    await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos?.[3]?.name || ""
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      className="no-underline"
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hotel-card">
        <img
          src={photoUrl}
          onError={() =>
            setPhotoUrl(
              "https://imgs.search.brave.com/0gAUiGVp5yUvd1b7Yj7MgAnDlBQ3II9h9YbMSa3lKuA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzA0LzEzLzU3/LzM2MF9GXzEwNDEz/NTc5MV8xY0xaSE5N/N1k3NFRGc0xLdEcw/OEpjZmJJZTNTaVJt/YS5qcGc"
            )
          }
          className="hotel-image"
        />

        <div className="hotel-details">
          <h2 className="hotel-name">{hotel?.hotelName}</h2>
          <h2 className="hotel-address">
            📍 Hotel Address: {hotel?.hotelAddress}
          </h2>
          <h2 className="hotel-price">💰 Price: ₹ {hotel?.price * 80}</h2>
          <h2 className="hotel-rating">🌟 Rating : {hotel?.rating} stars</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
