import React from "react";
import "./Hotels.css"; // Import CSS file
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div className="hotels-container">
      <h2 className="hotels-title">Hotel Recommendations</h2>
      <div className="hotels-grid">
        {trip?.TripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
