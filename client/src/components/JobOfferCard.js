import React from "react";

function JobOfferCard({ jobOffer }) {
  // Replace this with the actual content of your JobOfferCard component
  return (
    <div>
      <h3>{jobOffer.title}</h3>
      <p>{jobOffer.company}</p>
      <p>{jobOffer.email}</p>
    </div>
  );
}

export default JobOfferCard;
