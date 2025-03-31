import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels.jsx";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document :", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      alert("No trip found");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full p-10 md:px-40 lg:px64 xl:px-76">
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels  */}
      <Hotels trip={trip} />
      {/* Itenary  */}
      <PlacesToVisit trip={trip} />
      {/* suggestions  */}
      {/* footer  */}
      <Footer trip={trip} />
    </div>
  );
}

export default ViewTrip;
