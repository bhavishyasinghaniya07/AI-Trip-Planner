import React from "react";
import HotelCardItem from "./HotelCardItem";
import "./Hotels.css";

function Hotels({ trip }) {
  if (!trip?.TripData?.hotels || trip.TripData.hotels.length === 0) {
    return null;
  }

  return (
    <section className="hotels-section">
      <div className="section-header">
        <h2 className="section-title">Hotel Recommendations</h2>
        <div className="section-divider"></div>
      </div>

      <div className="hotels-grid">
        {trip.TripData.hotels.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}

export default Hotels;
