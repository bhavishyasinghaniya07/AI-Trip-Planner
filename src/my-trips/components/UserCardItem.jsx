import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import placeholder from "../../assets/placeholder.jpg";
import { Link } from "react-router-dom";
import "./UserCardItem.css"; // Import the CSS file

const UserCardItem = ({ trip }) => {
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link className="no-underline" to={`/view-trip/${trip?.id}`}>
      <div className="user-card">
        {/* Image Section */}
        <img src={photoUrl} onError={() => setPhotoUrl(placeholder)} />

        {/* Text Content */}
        <div>
          <h2 className="user-card-title">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="user-card-description">
            {trip?.userSelection?.noOfDays} days trip in
            <span> {trip?.userSelection?.budget}</span> budget with
            <span> {trip?.userSelection?.traveler}</span>
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserCardItem;
