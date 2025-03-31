import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import "./PlacesToVisit.css";

function PlacesToVisit({ trip }) {
  return (
    <div className="places-container">
      <h2 className="places-title">Places To Visit</h2>

      <div className="places-list">
        {trip.TripData?.itinerary.map((item, index) => (
          <div key={index} className="day-section">
            <h2 className="day-title">Day : {item.day}</h2>
            <div className="place-items">
              {item.places.map((place, index) => (
                <PlaceCardItem key={index} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
