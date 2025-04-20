import React, { useState } from "react";
import PlaceCardItem from "./PlaceCardItem";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./PlacesToVisit.css";

function PlacesToVisit({ trip }) {
  const [expandedDay, setExpandedDay] = useState(1);

  if (!trip?.TripData?.itinerary || trip.TripData.itinerary.length === 0) {
    return null;
  }

  const toggleDay = (day) => {
    if (expandedDay === day) {
      setExpandedDay(null);
    } else {
      setExpandedDay(day);
    }
  };

  return (
    <section className="places-section">
      <div className="section-header">
        <h2 className="section-title">Your Itinerary</h2>
        <div className="section-divider"></div>
      </div>

      <div className="itinerary-container">
        {trip.TripData.itinerary.map((item) => (
          <div key={item.day} className="day-container">
            <button
              className={`day-header ${
                expandedDay === item.day ? "active" : ""
              }`}
              onClick={() => toggleDay(item.day)}
            >
              <h3 className="day-title">Day {item.day}</h3>
              {expandedDay === item.day ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            <div
              className={`day-content ${
                expandedDay === item.day ? "expanded" : ""
              }`}
            >
              {item.places.map((place, index) => (
                <PlaceCardItem key={index} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PlacesToVisit;
