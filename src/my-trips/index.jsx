import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCardItem from "./components/UserCardItem";
import "./MyTrips.css";

const MyTrips = () => {
  const [userTrip, setUserTrip] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    try {
      const querySnapshot = await getDocs(q);
      setUserTrip([]);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrip((prevVal) => [...prevVal, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-trips-container">
      <div className="trips-header">
        <h1 className="my-trips-title">My Travel Adventures</h1>
        <p className="trips-subtitle">
          Discover your personalized AI-powered travel itineraries
        </p>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading your adventures...</p>
        </div>
      ) : userTrip.length > 0 ? (
        <div className="trips-grid">
          {userTrip
            .slice()
            .reverse()
            .map((trip, index) => (
              <UserCardItem trip={trip} key={index} />
            ))}
        </div>
      ) : (
        <div className="no-trips-container">
          <div className="no-trips-icon">🗺️</div>
          <h3>No trips found</h3>
          <p>Start planning your next adventure!</p>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
