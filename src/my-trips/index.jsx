import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCardItem from "./components/UserCardItem";
import "./MyTrips.css"; // Import CSS

const MyTrips = () => {
  const [userTrip, setUserTrip] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrip([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrip((prevVal) => [...prevVal, doc.data()]);
    });
  };

  return (
    <div className="my-trips-containe">
      {/* Header */}
      <h2 className="my-trips-title">Recent Trips</h2>

      {/* Grid Layout */}
      <div className="trips-grid">
        {userTrip?.length > 0
          ? userTrip
              .slice()
              .reverse()
              .map((trip, index) => <UserCardItem trip={trip} key={index} />)
          : Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="trip-placeholder"></div>
            ))}
      </div>
    </div>
  );
};

export default MyTrips;
